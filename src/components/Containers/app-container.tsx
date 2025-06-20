import React, { FC, useRef, useEffect } from "react";
import { AppContainterProps } from "@/interfaces";
import { useRouter } from "next/router";
import { Toaster } from "@/components/ui/sonner";

export const AppContainer: FC<AppContainterProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { pathname } = useRouter();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <>
      <main
        ref={ref}
        className="w-full h-screen overflow-y-scroll dark:text-white text-black relative"
      >
        <div className="w-full lg:max-w-4xl max-w-xs md:max mx-auto h-full pt-8 relative">
          {children as React.ReactNode}
          <div className="pb-24 w-24 h-12" />
        </div>
      </main>
      <Toaster />
    </>
  );
};
