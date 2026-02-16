import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import z from "zod";
import { runValidation } from "./validator.js";
import { listQuerySchema, loadConfig } from "./helpers.js";
import { Where } from "better-auth";
import { resourceZodSchema } from "./zod.js";

export const resourceEndpoints = {
  createResource: createAuthEndpoint(
    "/resource/create",
    {
      method: "POST",
      query: z.object({ resource: z.string() }),
      body: z.record(z.string(), z.unknown()),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "createResource",
          summary: "Create a new resource record",
          description: "Create a new record for the specified resource type.",
          responses: {
            "200": {
              description: "Resource created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        description: "The created resource record",
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);
      await runValidation({ body: ctx.body, bodySchema: resourceZodSchema(config.schema) });

      const record = await ctx.context.adapter.create({
        model: config.schema.modelName,
        data: { ...ctx.body, createdBy: ctx.context.session.user.id },
      });

      return ctx.json({ data: record });
    },
  ),
  getResource: createAuthEndpoint(
    "/resource/get",
    {
      method: "GET",
      query: z.object({ resource: z.string(), resourceId: z.string() }),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "getResource",
          summary: "Get a single resource record",
          description: "Get a single record by ID for the specified resource type.",
          responses: {
            "200": {
              description: "Resource found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        description: "The resource record",
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);

      const record = await ctx.context.adapter.findOne({
        model: config.schema.modelName,
        where: [{ field: "id", value: ctx.query.resourceId }],
      });

      if (!record) {
        throw new APIError("NOT_FOUND", {
          message: `${ctx.query.resource} not found`,
        });
      }

      return ctx.json({ data: record });
    },
  ),
  listResource: createAuthEndpoint(
    "/resource/list",
    {
      method: "GET",
      query: listQuerySchema,
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "listResource",
          summary: "List resource records with pagination",
          description: "List records for the specified resource type with pagination, sorting, and filtering.",
          responses: {
            "200": {
              description: "Paginated list of resource records",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        properties: {
                          results: {
                            type: "array",
                            items: { type: "object" },
                            description: "The list of resource records",
                          },
                          total: {
                            type: "number",
                            description: "Total number of records matching the query",
                          },
                          page: {
                            type: "number",
                            description: "Current page number",
                          },
                          perPage: {
                            type: "number",
                            description: "Number of records per page",
                          },
                          pageCount: {
                            type: "number",
                            description: "Total number of pages",
                          },
                        },
                        required: ["results", "total", "page", "perPage", "pageCount"],
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);

      const page = Math.max(1, Number(ctx.query?.page) || 1);
      const perPage = Math.min(100, Math.max(1, Number(ctx.query?.perPage) || 20));
      const offset = (page - 1) * perPage;

      // Sort
      let sortBy = { field: "createdAt", direction: "desc" as const };

      // Filters
      const where: Where[] = [];

      const [results, total] = await Promise.all([
        ctx.context.adapter.findMany({
          model: config.schema.modelName,
          where,
          limit: perPage,
          offset,
          sortBy,
        }),
        ctx.context.adapter.count({ model: config.schema.modelName, where }),
      ]);

      return ctx.json({
        data: {
          results,
          total,
          page,
          perPage,
          pageCount: Math.ceil(total / perPage),
        },
      });
    },
  ),
  updateResource: createAuthEndpoint(
    "/resource/update",
    {
      method: "PATCH",
      query: z.object({ resource: z.string(), resourceId: z.string() }),
      body: z.record(z.string(), z.unknown()),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "updateResource",
          summary: "Update a resource record",
          description: "Update an existing record by ID for the specified resource type.",
          responses: {
            "200": {
              description: "Resource updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        description: "The updated resource record",
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);
      await runValidation({ body: ctx.body, bodySchema: resourceZodSchema(config.schema, true) });

      const record = await ctx.context.adapter.update({
        model: config.schema.modelName,
        where: [{ field: "id", value: ctx.query.resourceId }],
        update: ctx.body,
      });

      return ctx.json({ data: record });
    },
  ),
  deleteResource: createAuthEndpoint(
    "/resource/delete",
    {
      method: "DELETE",
      query: z.object({ resource: z.string(), resourceId: z.string() }),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "deleteResource",
          summary: "Delete a resource record",
          description: "Delete a record by ID for the specified resource type.",
          responses: {
            "200": {
              description: "Resource deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                      },
                    },
                    required: ["success"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);

      await ctx.context.adapter.delete({
        model: config.schema.modelName,
        where: [{ field: "id", value: ctx.query.resourceId }],
      });

      return ctx.json({ success: true });
    },
  ),
  metadataResource: createAuthEndpoint(
    "/resource/metadata/get",
    {
      method: "GET",
      query: z.object({ resource: z.string() }),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          operationId: "getResourceMetadata",
          summary: "Get resource metadata",
          description: "Get metadata for a specific resource, including field definitions and validation rules.",
          responses: {
            "200": {
              description: "Resource metadata retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        properties: {
                          fields: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                name: { type: "string" },
                                type: { type: "string" },
                                required: { type: "boolean" },
                                validationRules: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      rule: { type: "string" },
                                      value: { type: "string" },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["data"],
                  },
                },
              },
            },
          },
        },
      },
    },
    async (ctx) => {
      const config = await loadConfig(ctx.query.resource);

      return ctx.json({
        data: config.schema,
      });
    },
  ),
}
