import type { ResourceConfig } from "../types.js";
import { taskSchema } from "./schema.js";

export const config: ResourceConfig = {
  name: "task",
  schema: taskSchema,
  permissions: ["create", "read", "update", "delete"],
};
