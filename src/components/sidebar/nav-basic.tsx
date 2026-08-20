import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavBasicType } from "@/interfaces";
import { TransitionLink } from "../transition-link";

type NavBasicProps = {
  items: NavBasicType[];
  name: string;
};

export const NavBasic = ({ items, name }: NavBasicProps) => (
  <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>{name}</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            render={
              <TransitionLink href={item.url} target="_blank">
                <item.icon />
                <span>{item.title}</span>
              </TransitionLink>
            }
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
