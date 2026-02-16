import type { ResourceConfig } from "../types.js";
import { projectSchema } from "./schema.js";

export const config: ResourceConfig = {
  name: "Projects",
  schema: projectSchema,
  permissions: ["create", "read", "update", "delete"],
};
