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

const { socials, user } = data;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavBlogs />
        <NavBasic items={socials} name="Socials" />
      </SidebarContent>
    </Sidebar>
  );
}
