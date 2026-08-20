import { Scales } from "@/components/ui/scales";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fragment, type FC, type PropsWithChildren } from "react";

export const MdContents: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  const isMobile = useIsMobile();
  const WrapperComponent = !isMobile ? Wrapper : Fragment;
  return (
    <div className="relative w-full bg-transparent md:text-base text-sm **:no-underline">
      <WrapperComponent>
        <h2 className="font-bold text-3xl tracking-tighter z-50 text-foreground md:pt-0 pt-6">
          Table of Contents
        </h2>
        <Separator className="z-0 mt-2" />
        {children}
      </WrapperComponent>
    </div>
  );
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-10 md:py-20">
      <div className="relative size-3/4 rounded-lg">
        <div className="absolute inset-y-[-20%] -left-16 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={9} className="rounded-lg" />
        </div>
        <div className="absolute inset-y-[-20%] -right-16 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={9} className="rounded-lg" />
        </div>
        <div className="absolute inset-x-[-20%] -top-16 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={9} className="rounded-lg" />
        </div>
        <div className="absolute inset-x-[-20%] -bottom-16 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={9} className="rounded-lg" />
        </div>
        <div className="relative size-full z-10 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
