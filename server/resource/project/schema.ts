import { BetterAuthDBSchema } from "better-auth";

export const projectSchema: BetterAuthDBSchema[0] = {
  modelName: "project",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    status: {
      type: "string",
      required: true,
      defaultValue: "active",
    },
    startDate: {
      type: "date",
      required: false,
    },
    endDate: {
      type: "date",
      required: false,
    },
    createdBy: {
      type: "string",
      required: true,
      returned: false,
      references: {
        model: "user",
        field: "id",
        onDelete: "cascade",
      },
    },
    createdAt: {
      type: "date",
      defaultValue: () => new Date(),
      required: true,
    },
    updatedAt: {
      type: "date",
      defaultValue: () => new Date(),
      onUpdate: () => new Date(),
      required: true,
    },
  }
}
