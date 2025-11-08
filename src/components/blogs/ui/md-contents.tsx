import Meteors from "@/components/meteors";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FC, PropsWithChildren } from "react";

export const MdContents: FC<PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => {
  return (
    <Card className="md:px-8 px-4 my-4 overflow-hidden relative w-full dark:bg-muted/10 bg-transparent md:text-base text-sm">
      <h2 className="font-bold text-3xl tracking-tighter z-50">
        Table of Contents
      </h2>
      <Separator className="-mt-4 -mb-3 z-0" />
      {children}
      <Meteors />
    </Card>
  );
};
