import type { HTMLAttributes } from "@/interfaces";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

const headingVariants = cva("font-bold leading-tight tracking-tighter ", {
  variants: {
    variant: {
      h1: "text-4xl md:text-5xl pb-4 pt-6",
      h2: "text-3xl md:text-4xl pb-3 pt-5",
      h3: "text-2xl md:text-3xl pb-2 pt-8",
      h4: "text-xl md:text-2xl py-1",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
    },
  },
});

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
