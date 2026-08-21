import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MotionText } from "@/motion/components/motion-text";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { state } = useSidebar();

  return (
    <SidebarMenu className="z-10">
      <SidebarMenuItem className="pt-2">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent data-[state=open]:hidden hover:bg-foreground hover:text-background "
        >
          <Avatar className="md:h-8 md:w-8 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">BB</AvatarFallback>
          </Avatar>
          <div className="grid text-left text-sm leading-tight">
            <MotionText
              animation={{
                mode: ["fadeUp", "filterBlurIn", "flash"],
                transition: "gentle",
                delay: 0.25,
                duration: 0.8,
              }}
              config={{
                duration: 0.05,
                delayLogic: "linear",
                mode: "chars",
              }}
              controller={{
                configView: {
                  amount: 0.5,
                  once: false,
                },
                trigger: state === "expanded",
              }}
              wrapperClassName="truncate font-medium text-md flex-1"
              elementType="p"
            >
              {user.name}
            </MotionText>
            <MotionText
              elementType="p"
              animation={{
                mode: ["fadeDown", "filterBlurIn", "flash"],
                transition: "gentle",
                delay: 0.75,
                duration: 0.8,
              }}
              config={{
                duration: 0.05,
                delayLogic: "linear",
                mode: "chars",
              }}
              controller={{
                trigger: state === "expanded",
              }}
              wrapperClassName="truncate text-xs"
            >
              {user.email}
            </MotionText>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
