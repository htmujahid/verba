import { Outlet } from "react-router"

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/client/components/ui/sidebar"

import { AppSidebar } from "@/client/components/layouts/app-sidebar"
import { AppBreadcrumbs } from "./app-breadcrumb"

export function ResourceLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <AppBreadcrumbs />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
