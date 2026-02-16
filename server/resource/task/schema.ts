import { BetterAuthDBSchema } from "better-auth";

export const taskSchema: BetterAuthDBSchema[0] = {
  modelName: "task",
  fields: {
    title: {
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
      defaultValue: "todo",
    },
    priority: {
      type: "string",
      required: true,
      defaultValue: "medium",
    },
    projectId: {
      type: "string",
      required: true,
      references: {
        model: "project",
        field: "id",
        onDelete: "cascade",
      },
    },
    dueDate: {
      type: "date",
      required: false,
    },
    createdBy: {
      type: "string",
      required: true,
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