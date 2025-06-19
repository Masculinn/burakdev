import {
  SidebarComponentProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import React, { FC } from "react";
import { ReduxThemeProps } from "@/interfaces";
import { Separator } from "@radix-ui/react-separator";
import { useDispatch, useSelector } from "react-redux";
import AppSidebar from "@/components/Sidebar/app-sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { setTheme as setAppTheme } from "@/redux/slices/themeSlice";
import { NavigationBreadcrumb } from "@/components/Sidebar/NavigationBreadcrumb";
import { AppContainer } from "@/components/Containers/app-container";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const font = poppins.className;

const SidebarProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );

  const toggleTheme = (checked: boolean) =>
    dispatch(setAppTheme(checked ? "dark" : "light"));

  return (
    <SidebarComponentProvider
      defaultOpen
      className={cn(appTheme === "dark" && "dark", font, "w-full h-screen")}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between w-full flex-row items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger
              className={cn("-ml-1 cursor-pointer dark:text-white")}
            />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <NavigationBreadcrumb />
            <ThemeSwitcher
              onChange={toggleTheme}
              theme={appTheme}
              classname="absolute right-4"
            />
          </div>
        </header>
        <AppContainer>{children as React.ReactNode}</AppContainer>
      </SidebarInset>
    </SidebarComponentProvider>
  );
};

export default SidebarProvider;
