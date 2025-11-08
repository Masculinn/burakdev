import { NavBasic } from "@/components/sidebar/nav-basic";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import data from "@/constants/sidebar.data";
import type * as React from "react";
import { NavBlogs } from "./nav-blogs";
import { NavProjects } from "./nav-projects";

const items = [
  {
    title: "Motion Provider",
    url: "https://motionprovider.dev",
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavBlogs />
        <NavProjects items={items} />
        <NavBasic items={data.socials} name="Socials" />
      </SidebarContent>
    </Sidebar>
  );
}
