import { Separator } from "@/components/ui/separator";
import type { HTMLAttributes } from "@/interfaces";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type MdHrProps = HTMLAttributes<HTMLHRElement>;

export const MdHr: FC<MdHrProps> = (props) => (
  <Separator
    orientation="horizontal"
    className={cn("my-4", props.className)}
    {...props}
  />
);
