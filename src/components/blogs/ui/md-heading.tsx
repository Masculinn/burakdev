import type { HTMLAttributes } from "@/interfaces";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const headingVariants = cva(
  "font-bold leading-tight tracking-tighter text-foreground",
  {
    variants: {
      variant: {
        h1: "text-5xl pb-4 pt-6",
        h2: "text-4xl pt-5",
        h3: "text-3xl pt-4",
        h4: "text-2xl",
        h5: "text-xl ",
        h6: "text-lg ",
      },
    },
  },
);

export const MdHeading = ({
  as: Component = "h1",
  className,
  ...props
}: HeadingProps) => {
  return (
    <Component
      className={cn(headingVariants({ variant: Component }), className)}
      {...props}
    />
  );
};
