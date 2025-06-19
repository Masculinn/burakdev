import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import React, { FC, useEffect, useMemo, useState } from "react";
import { SidebarNavMainProps } from "@/interfaces";
import Link from "next/link";
import { db } from "@/db";
import { Skeleton } from "../ui/skeleton";

export const NavMain: FC<{ items: SidebarNavMainProps[]; title?: string }> = ({
  items,
  title = "Platform",
}) => {
  const [navItems, setNavItems] = useState<SidebarNavMainProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isBlog = items[0].title === "Blogs";

    if (isBlog) {
      setIsLoading(true);

      const fetchBlogItems = async () => {
        try {
          const { data, error } = await db.from("blog_posts").select("*");

          if (!data || error) {
            throw error;
          }

          setNavItems(
            items.map((item, index) =>
              index === 0
                ? {
                    ...item,
                    items: data.map((val) => ({
                      title: val.title,
                      url: `/blogs/${val.slug}`,
                    })),
                  }
                : item
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        } finally {
          setIsLoading(false);
        }
      };

      fetchBlogItems();
    } else {
      setNavItems(items);
    }
  }, [items]);

  const renderLoading = useMemo(() => {
    const loading = Array.from({ length: 8 }).fill(
      <Skeleton className="w-full h-4" />
    ) as React.ReactNode[];
    return loading;
  }, [isLoading]);

  if (isLoading || navItems.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{title}</SidebarGroupLabel>
        <SidebarMenu>
          {renderLoading.map((val, idx) => (
            <SidebarMenuItem key={idx}>{val}</SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {navItems?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {!item.items || item.items?.length === 0 ? (
                <Link href={item.url!}>
                  <SidebarMenuButton asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span
                        className={`${
                          items[0].title === "Blogs" && "tracking-tight text-xs"
                        }`}
                      >
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuButton>
                </Link>
              ) : (
                <>
                  <CollapsibleTrigger asChild>
                    <Link href={item.url! || "/"}>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.items && item.items?.length > 0 && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
