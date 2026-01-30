import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express, { type Request, type Response, type NextFunction } from 'express'
import type { ViteDevServer } from 'vite'
import { API_ROUTES, APP_CONFIG, type HealthStatus } from '../shared/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'

// In production, server runs from dist/server/server/, client files are in dist/client/
// In development, we're in the server/ folder
const projectRoot = isProduction ? path.resolve(__dirname, '../../..') : path.resolve(__dirname, '..')
const clientDist = path.resolve(projectRoot, 'dist/client')

async function createServer() {
  const app = express()

  // Parse JSON for API routes
  app.use(express.json())

  // API routes - using shared route constants
  app.get(API_ROUTES.health, (_req: Request, res: Response) => {
    const response: HealthStatus = { status: 'ok' }
    res.json(response)
  })


  if (isProduction) {
    // Production: serve static files from dist/client/
    app.use(express.static(clientDist))

    // SPA fallback for production
    app.get('*path', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(clientDist, 'index.html'))
    })
  } else {
    // Development: use Vite middleware for HMR
    const { createServer: createViteServer } = await import('vite')
    const vite: ViteDevServer = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)

    // Serve index.html for all non-API routes (SPA fallback)
    app.use('*path', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl

      // Skip API routes
      if (url.startsWith('/api')) {
        return next()
      }

      try {
        // Read index.html
        let template = fs.readFileSync(
          path.resolve(projectRoot, 'index.html'),
          'utf-8'
        )

        // Apply Vite HTML transforms (injects HMR client, etc.)
        template = await vite.transformIndexHtml(url, template)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      } catch (e) {
        const error = e instanceof Error ? e : new Error(String(e))
        vite.ssrFixStacktrace(error)
        console.error(error)
        res.status(500).end(error.message)
      }
    })
  }

  const port = process.env.PORT || APP_CONFIG.defaultPort
  app.listen(port, () => {
    console.log(`${APP_CONFIG.appName} running at http://localhost:${port} (${isProduction ? 'production' : 'development'})`)
  })
}

createServer()
