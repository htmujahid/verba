import { createAuthClient } from "better-auth/react"
import { adminClient, twoFactorClient } from "better-auth/client/plugins"
import { resourcePluginClient } from "./resource-client"

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_APP_URL,
  basePath: "/api",
  plugins: [
    adminClient(),
    twoFactorClient(),
    resourcePluginClient(),
  ],
})
