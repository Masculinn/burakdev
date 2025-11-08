import slugs from "@/generated/slugs.json" with { type: "json" };

import MotionContainer from "@/motion/motion-container";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { Book, BookOpenText, ChevronRight, Library } from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
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

export function NavBlogs() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Blogs</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={"Blogs"}>
                <BookOpenText />
                <span className="font-secondary tracking-tight">
                  justc0de_sessions
                </span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem key="view-all">
                  <SidebarMenuSubButton asChild>
                    <Link href="/blogs">
                      <Library />
                      <span>View All</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                {slugs.map((item, idx) => (
                  <SidebarMenuSubItem key={item.title}>
                    <MotionContainer
                      animation={{
                        mode: ["fadeLeft", "filterBlurIn"],
                        transition: "gentle",
                        delay: 0.25 * idx,
                        duration: 0.8,
                      }}
                      elementType="div"
                    >
                      <SidebarMenuSubButton asChild>
                        <Link href={`/blogs/${item.url}`}>
                          <Book />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
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
