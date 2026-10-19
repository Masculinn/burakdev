import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { NavBasicType } from "@/interfaces";
import type Link from "next/link";
import type * as React from "react";
import { TransitionLink } from "../transition-link";

type NavBasicProps = {
  items: NavBasicType[];
  name: string;
  linkProps?: Omit<React.ComponentProps<typeof Link>, "href">;
};

function WrapperLink({
  children,
  title,
  url,
  ...linkProps
}: Pick<NavBasicType, "title" | "url"> & {
  children: React.ReactNode;
} & NavBasicProps["linkProps"]) {
  const { isMobile, toggleSidebar, openMobile } = useSidebar();

  const handleClick = () => {
    if (!isMobile) return;

    if (openMobile) toggleSidebar();
  };

  return (
    <TransitionLink
      href={url}
      title={title}
      aria-label={title}
      onClick={handleClick}
      onTouchStart={handleClick}
      {...linkProps}
    >
      {children}
    </TransitionLink>
  );
}

export const NavGroup = ({ items, name, linkProps }: NavBasicProps) => (
  <SidebarGroup>
    <SidebarGroupLabel>{name}</SidebarGroupLabel>
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton
            tooltip={item.title}
            render={
              <WrapperLink url={item.url} title={item.title} {...linkProps}>
                <item.icon />
                <span>{item.title}</span>
              </WrapperLink>
            }
          />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  </SidebarGroup>
);
