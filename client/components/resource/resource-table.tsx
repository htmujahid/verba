"use client";

import * as React from "react";
import { DataTable } from "@/client/components/data-table/data-table";
import { useDataTable } from "@/client/hooks/use-data-table";
import { DataTableAdvancedToolbar } from "../data-table/data-table-advanced-toolbar";
import { DataTableFilterList } from "../data-table/data-table-filter-list";
import { DataTableSortList } from "../data-table/data-table-sort-list";
import { useResourceList, useResourceMetadata } from "@/client/data/resource/query";
import { getResourceColumns } from "./resource-table-columns";
import type { ResourceDataSchema } from "@/client/types/resource";
import { useParams } from "react-router";

export function ResourceTable() {
  const params = useParams<{ resource: string }>();
  const { data: resourceMetadata } = useResourceMetadata(params.resource!);
  const { data } = useResourceList(params.resource!);

  const columns = React.useMemo(
    () => getResourceColumns<ResourceDataSchema>(resourceMetadata),
    [resourceMetadata],
  );

  const getRowId = React.useCallback(
    (row: ResourceDataSchema) => row.id as string,
    [],
  );

  const { table } = useDataTable<ResourceDataSchema>({
    data: data.results,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "title", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId
  });

  return (
    <div className="data-table-container">
      <DataTable table={table}>
        <DataTableAdvancedToolbar table={table}>
          <DataTableFilterList table={table} />
          <DataTableSortList table={table} />
        </DataTableAdvancedToolbar>
      </DataTable>
    </div>
  );
}