import AppNav from "@/components/app-nav";
import { NavigationBreadCrumb } from "@/components/navigation/navigation-breadcrumb";
import { ThemeSwitch } from "@/components/navigation/theme-switch";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Head from "next/head";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <SidebarProvider
        className={cn(`${primaryFont.className} ${secondaryFont.variable}`)}
      >
        <AppSidebar collapsible="icon" />
        <SidebarInset>
          <AppNav>
            <div className="flex items-center gap-2 md:px-8 px-6">
              <SidebarTrigger className="cursor-pointer " />
              <div className="h-4 w-px bg-muted-foreground -ml-0.5 md:mr-2 md:ml-0.5 mr-1" />
              <NavigationBreadCrumb className="z-50" />
              <ThemeSwitch className="absolute right-8" />
            </div>
          </AppNav>
          <div className="w-full lg:max-w-4xl max-w-[20.8rem] mx-auto h-full py-8 relative z-0">
            {children}
          </div>
          <footer className="pb-3">
            <div className="w-full h-12 flex items-center justify-center">
              <p className="text-muted-foreground text-xs">
                &copy; {new Date().getFullYear()} Burak Bilen, all rights
                reserved.
              </p>
            </div>
          </footer>
        </SidebarInset>
        <Toaster position="top-center" />
      </SidebarProvider>
    </>
  );
}
