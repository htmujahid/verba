import { APIError } from "better-auth";
import z from "zod";
import { ResourceConfig } from "./types.js";

export const operationMap: Record<string, string> = {
  eq: "eq",
  ne: "ne",
  lt: "lt",
  lte: "lte",
  gt: "gt",
  gte: "gte",
  in: "in",
  contains: "contains",
  starts_with: "starts_with",
  ends_with: "ends_with",
};

export const sortItemSchema = z.object({
  name: z.string(),
  desc: z.boolean(),
});

export const filterItemSchema = z.object({
  name: z.string(),
  operation: z.string(),
  value: z.string(),
});

export const listQuerySchema = z.object({
  resource: z.string(),
  page: z.string().or(z.number()).optional(),
  perPage: z.string().or(z.number()).optional(),
  sort: z.string().optional(),
  filters: z.string().optional(),
});

export async function loadConfig(resource: string): Promise<ResourceConfig> {
  try {
    const mod = await import(`../resource/${resource}/config.js`);
    return mod.config;
  } catch {
    throw new APIError("NOT_FOUND", {
      message: `Resource '${resource}' not found`,
    });
  }
}