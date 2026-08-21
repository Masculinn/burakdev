import slugs from "@/generated/slugs.json" with { type: "json" };

import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionContainer } from "@/motion/components/motion-container";
import { Book, BookOpenText, ChevronRight, Library } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

const animation = getAnimation("navBlogs");
export function NavBlogs() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Blogs</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger
              render={
                <SidebarMenuButton tooltip={"Blogs"}>
                  <BookOpenText />
                  <span className="font-secondary tracking-tight">
                    justc0de_sessions
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              }
            ></CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem key="view-all">
                  <SidebarMenuSubButton
                    render={
                      <Link href="/blogs">
                        <Library />
                        <span>View All</span>
                      </Link>
                    }
                  />
                </SidebarMenuSubItem>
                {slugs.map((item, idx) => (
                  <SidebarMenuSubItem key={item.title}>
                    <MotionContainer
                      {...animation}
                      animation={{
                        ...animation.animation,
                        delay: 0.25 * idx,
                      }}
                    >
                      <SidebarMenuSubButton
                        render={
                          <Link href={`/blogs/${item.url}`}>
                            <Book />
                            <span>{item.title}</span>
                          </Link>
                        }
                      />
                    </MotionContainer>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
