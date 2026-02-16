import { BetterAuthDBSchema } from "better-auth";

export interface ResourceConfig {
  name: string;

  schema: BetterAuthDBSchema[0];

  permissions: readonly string[];
}
