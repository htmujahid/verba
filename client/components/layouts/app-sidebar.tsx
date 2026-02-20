"use client"

import * as React from "react"

import { NavResources } from "@/client/components/layouts/nav-resources"
import { NavProjects } from "@/client/components/layouts/nav-projects"
import { NavUser } from "@/client/components/layouts/nav-user"
import { ModuleSwitcher } from "@/client/components/layouts/module-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/client/components/ui/sidebar"
import {
  LayoutDashboard,
  ListChecks,
  BarChart3,
  GalleryVerticalEnd,
  AudioLines,
  Terminal,
  TerminalSquare,
  Bot,
  BookOpen,
  Settings,
  Frame,
  PieChart,
  MapPin,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
} from "lucide-react"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"

// This is sample data.
const data = {
  modules: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEnd />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLines />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <Terminal />,
      plan: "Free",
    },
  ],
  navMain: [
    { title: "Dashboard", url: "#", icon: <LayoutDashboard /> },
    { title: "Lifecycle", url: "#", icon: <ListChecks /> },
    { title: "Analytics", url: "#", icon: <BarChart3 /> },
  ],
  navResources: [
    {
      title: "Projects",
      url: "#",
      icon: <TerminalSquare />,
      items: [],
    },
    {
      title: "Tasks",
      url: "#",
      icon: <Bot />,
      items: [],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpen />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: <Frame /> },
    { name: "Sales & Marketing", url: "#", icon: <PieChart /> },
    { name: "Travel", url: "#", icon: <MapPin /> },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <SettingsIcon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <HelpCircleIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSwitcher modules={data.modules} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavResources title="Resources" items={data.navResources} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
