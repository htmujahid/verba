import { ResourceTable } from "@/client/components/resource/resource-table";
import { Suspense } from "react";

export default function Resource() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResourceTable />
      </Suspense>
    </div>
  )
}