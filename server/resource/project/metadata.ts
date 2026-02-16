export const projectMetadata = {
  name: "Project",
  list: [
    {
      id: "name",
      label: "Name",
      type: "string",
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
  form: [
    {
      id: "name",
      label: "Name",
      type: "string",
    },
    {
      id: "description",
      label: "Description",
      type: "string",
    }
  ]
}