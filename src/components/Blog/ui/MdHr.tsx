import { FC } from "react";
import { Separator } from "@/components/ui/separator";

export const MdHr: FC<React.HTMLAttributes<HTMLHRElement>> = ({ ...props }) => (
  <Separator orientation="horizontal" {...props} />
);
