import { Card } from "@/components/ui/card";
import { Scales } from "@/components/ui/scales";
import { Separator } from "@/components/ui/separator";
import type { FC, PropsWithChildren } from "react";

export const MdContents: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  return (
    <Card
      className="p-0 overflow-hidden relative w-full dark:bg-muted/10 bg-transparent md:text-base text-sm **:no-underline"
      size="sm"
    >
      <Wrapper>
        <h2 className="font-bold text-3xl tracking-tighter z-50">
          Table of Contents
        </h2>
        <Separator className="z-0 mt-2" />
        {children}
      </Wrapper>
    </Card>
  );
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex w-full items-center justify-center overflow-hidden py-10 md:py-20">
      <div className="relative size-3/4 rounded-lg">
        <div className="absolute inset-y-[-30%] -left-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={8} className="rounded-lg" />
        </div>
        <div className="absolute inset-y-[-30%] -right-10 h-[160%] w-8 mask-t-from-90% mask-b-from-90%">
          <Scales size={8} className="rounded-lg" />
        </div>
        <div className="absolute inset-x-[-30%] -top-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={8} className="rounded-lg" />
        </div>
        <div className="absolute inset-x-[-30%] -bottom-10 h-8 w-[160%] mask-r-from-90% mask-l-from-90%">
          <Scales size={8} className="rounded-lg" />
        </div>
        <div className="relative size-full z-10 overflow-hidden p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
