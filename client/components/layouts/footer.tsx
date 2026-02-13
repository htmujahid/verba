import { APP_CONFIG } from '../../../shared'

export function Footer() {
  return (
    <footer className="border-t py-4 text-center">
      <p className="text-sm text-muted-foreground">
        {APP_CONFIG.appName} &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}
