# Verba

localhost:3000 full-stack TypeScript starter. Your React 19 SPA and Express 5 API run on the same server - no CORS config, no proxy setup, no port juggling.

## Features

- **Single Port Architecture** - Client and API served from one Express server on `localhost:3000`
- **Client-Side Rendering** - React 19 SPA with Vite 7 and React Compiler enabled
- **Authentication** - [Better Auth](https://www.better-auth.com/) integrated out of the box
- **UI Components** - [Material UI (MUI)](https://mui.com/) for a polished, accessible design system
- **Data Fetching** - [TanStack Query](https://tanstack.com/query) for powerful async state management
- **Shared Types** - TypeScript types and constants shared between client and server
- **Hot Reload Everywhere** - Vite HMR works seamlessly through Express in development
- **Production Ready** - Docker + Nginx setup included

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, React Compiler |
| UI | Material UI (MUI) |
| Data Fetching | TanStack Query |
| Backend | Express 5, Node.js |
| Auth | Better Auth |
| Language | TypeScript 5.9 (end-to-end) |
| DevOps | Docker, Nginx |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (client + API on port 3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - that's it. One port, full-stack ready.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build client and server for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
verba/
├── client/          # React SPA (CSR)
├── server/          # Express API
├── shared/          # Shared types, routes, utilities
├── docker-compose.yml
└── Dockerfile
```

## Architecture

```
┌─────────────────────────────────────────┐
│            localhost:3000               │
├─────────────────────────────────────────┤
│                Express                  │
│  ┌───────────────┬───────────────────┐  │
│  │   /api/*      │      /*           │  │
│  │   API Routes  │   React SPA (CSR) │  │
│  │   + Auth      │   + Static Files  │  │
│  └───────────────┴───────────────────┘  │
└─────────────────────────────────────────┘
```

## Production

```bash
# Build everything
npm run build

# Run with Docker
docker-compose up
```

## License

MIT
