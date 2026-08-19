import { useIsMobile } from "@/hooks/use-mobile";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Box, Folder, Forward, Heart, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

type NavProjectsProps = {
  title: string;
  url: string;
};

export function NavProjects({ items }: { items: NavProjectsProps[] }) {
  const isMobile = useIsMobile();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Remarkable Projects</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton>
              <Box />
              <span>{item.title}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                }
              />
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  nativeButton={false}
                  render={
                    <Link
                      target="_blank"
                      href={item.url}
                      className="flex gap-2"
                    >
                      <Folder className="text-muted-foreground" />
                      <span>View Project</span>
                    </Link>
                  }
                />
                <ShareMenuItem url={item.url} />
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="group"
                  nativeButton={false}
                  render={
                    <Link
                      target="_blank"
                      href="https://buymeacoffee.com/bilenburakf"
                    >
                      <Heart
                        className="md:group-hover:text-rose-500 text-rose-500"
                        fill="currentColor"
                      />
                      <span>Support Project</span>
                    </Link>
                  }
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function ShareMenuItem({ url }: { url: string }) {
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleClick() {
    copyToClipboard(url);
    toast.success("Project link copied to clipboard.", {
      richColors: true,
    });
  }

  return (
    <DropdownMenuItem
      nativeButton={false}
      render={
        <button
          type="button"
          onClick={handleClick}
          className="w-full items-center justify-start decoration-0 "
        >
          <Forward />
          <span className="font-normal">Share Project</span>
        </button>
      }
    />
  );
}
