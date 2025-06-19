import * as React from "react";
import { NavMain } from "@/components/Sidebar/nav-main";
import { NavUser } from "@/components/Sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarConfig } from "@/lib/sidebar.config";
import { NavProjects } from "./nav-projects";
import { NavSocials } from "./nav-socials";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={sidebarConfig.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarConfig.navMain} title="Platform" />
        <NavMain items={sidebarConfig.blogs} title="My Blogs" />
        <NavMain items={sidebarConfig.motionProvider} title="Motion Provider" />
        <NavProjects
          projects={sidebarConfig.projects}
          title="Motion Projects"
          isMore
        />
        <NavSocials socials={sidebarConfig.socials} title="Socials" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
