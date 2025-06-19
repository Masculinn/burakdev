import { ExternalLink, Eye, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { FC } from "react";
import { SidebarProjectItem } from "@/interfaces";
import Link from "next/link";
import Ping from "../ui/ping";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import ImageMotion from "../MotionProvider/motion-image";

export const NavProjects: FC<{
  projects: SidebarProjectItem[];
  title: string;
  isMore?: boolean;
}> = ({ projects, title, isMore }) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="hover:underline underline-offset-2">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects
          .filter((val) => val.name !== "Project X")
          .map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              {isMore && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem className="dark:hover:bg-stone-800 dark:hover:text-white cursor-pointer">
                      <ExternalLink className="text-muted-foreground" />
                      <span>View Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-stone-800 hover:text-white cursor-pointer">
                      <Ping mode="success" size="sm" isAnimated />
                      <span className="font-bold tracking-tighter">
                        Complexity
                      </span>
                      <Badge
                        variant={
                          item.complexity === "hard"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {item.complexity}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <ImageMotion
                        imageUrl={item.image}
                        animations={["filterInvertColors"]}
                        isDynamicallyQueued
                        motionFn={!isMobile ? "hover" : undefined}
                        transition="smooth"
                        delayLogic="sinusoidal"
                        animationDuration={1}
                        pieces={64}
                        wrapperClassName="h-36 w-full z-50 "
                        fallback={
                          <Skeleton className="h-36 w-full z-50 absolute" />
                        }
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
