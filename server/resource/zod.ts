import * as z from "zod";
import { BetterAuthDBSchema } from "better-auth";

export function resourceZodSchema(schema: BetterAuthDBSchema[0], forUpdate = false) {
  const jsonSchema: z.core.JSONSchema.JSONSchema = {
    type: "object",
    properties: Object.fromEntries(Object.entries(schema.fields).map(([field, config]) => {
      let type: z.core.JSONSchema.JSONSchema['type'];
      switch (config.type) {
        case "string":
          type = "string";
          break;
        case "number":
          type = "number";
          break;
        case "date":
          type = "string"; // Dates are represented as strings in JSON
          break;
        default:
          type = "string"; // Default to string for unknown types
      }
      return [field, { type }];
    })),
    required: forUpdate ? undefined : Object.keys(schema.fields).filter((field) =>
      schema.fields[field].required
      && schema.fields[field].defaultValue === undefined
      && field !== "createdBy"
    ),
    additionalProperties: false,
  };

  return z.fromJSONSchema(jsonSchema)
}
