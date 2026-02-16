import type { BetterAuthPlugin } from "better-auth";
import type { ResourceConfig } from "../resource/types.js";
import { resourceEndpoints } from "./endpoints.js";

export function resourcePlugin(configs: ResourceConfig[]) {
  const schema: Record<string, any> = {};

  for (const config of configs) {
    Object.assign(schema, { [config.schema.modelName]: config.schema });
  }

  return {
    id: "resource",
    schema,
    endpoints: resourceEndpoints,
  } satisfies BetterAuthPlugin;
}
