import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getAnimation } from "@/lib/motion/getAnimation";
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
              {...getAnimation("navUserName")}
              controller={{
                configView: {
                  amount: 0.5,
                  once: false,
                },
                trigger: state === "expanded",
              }}
            >
              {user.name}
            </MotionText>
            <MotionText
              {...getAnimation("navUserEmail")}
              controller={{
                trigger: state === "expanded",
              }}
            >
              {user.email}
            </MotionText>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
