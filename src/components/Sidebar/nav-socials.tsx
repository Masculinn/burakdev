import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { SidebarSocialItemProps } from "@/interfaces";
import Link from "next/link";

export const NavSocials: FC<{
  socials: SidebarSocialItemProps[];
  title: string;
}> = ({ socials, title }) => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="hover:underline underline-offset-2">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {socials.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url} target="_blank" className="group">
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
