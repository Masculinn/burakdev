import { CodeBadgeProps } from "@/interfaces";
import { FC } from "react";
import { Badge } from "../ui/badge";

export const CodeBadge:FC<CodeBadgeProps> = ({ code, children }) => {
    return (
        <Badge variant="outline" className="font-mono">
        {children ?? code}
      </Badge>
    );
}