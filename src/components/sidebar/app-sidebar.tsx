import { NavGroup } from "@/components/sidebar/nav-basic";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  articlesData,
  platformData,
  socialsData,
} from "@/constants/sidebar.data";
import type * as React from "react";

const { socials, user } = socialsData;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={platformData} name="Platform" />
        <NavGroup items={articlesData} name="Latest Articles" />
        <NavGroup
          items={socials}
          name="Socials"
          linkProps={{ target: "_blank" }}
        />
      </SidebarContent>
    </Sidebar>
  );
}
