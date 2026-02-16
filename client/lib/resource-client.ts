import type { BetterAuthClientPlugin } from "better-auth/client";
import type { resourcePlugin } from "@/server/resource/plugin";

export const resourcePluginClient = () => {
  return {
    id: "resource",
    $InferServerPlugin: {} as ReturnType<typeof resourcePlugin>,
  } satisfies BetterAuthClientPlugin
}