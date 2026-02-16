import type { Column, ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/client/components/data-table/data-table-column-header";
import { Checkbox } from "@/client/components/ui/checkbox";
import type { BetterAuthDBSchema } from "better-auth";

export function getResourceColumns<T>(
  resourceMetadata: BetterAuthDBSchema[0],
): ColumnDef<T>[] {
  const fields = Object.keys(resourceMetadata?.fields || {}).map((field) => {
    return {
      name: field,
      ...resourceMetadata.fields[field],
    }
  });

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 32,
      enableSorting: false,
      enableHiding: false,
    },
    ...fields.filter(field => field.returned !== false).map((field) => ({
      id: field.name,
      accessorKey: field.name,
      header: ({ column }: { column: Column<T, unknown> }) => (
        <DataTableColumnHeader column={column} label={field.name} />
      ),
      enableSorting: true,
      enableColumnFilter: true,
    })),
  ] as ColumnDef<T, unknown>[];
}
