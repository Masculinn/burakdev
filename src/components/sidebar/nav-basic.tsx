import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavBasicType } from "@/interfaces";
import type Link from "next/link";
import { TransitionLink } from "../transition-link";

type NavBasicProps = {
  items: NavBasicType[];
  name: string;
  linkProps?: Omit<React.ComponentProps<typeof Link>, "href">;
};

export const NavGroup = ({ items, name, linkProps }: NavBasicProps) => (
  <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>{name}</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            render={
              <TransitionLink {...linkProps} href={item.url} title={item.title}>
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
