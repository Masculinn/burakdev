// ui/MdTableComponents.tsx
import { cn } from "@/lib/utils";
import { FC } from "react";

export const MdTable: FC<React.HTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <table
    className={cn(
      "min-w-80 my-12 text-sm divide-y divide-neutral-200 dark:divide-neutral-900",
      className
    )}
    {...props}
  />
);
export const MdThead: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <thead
    className={cn(
      "bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-600",
      className
    )}
    {...props}
  />
);

export const MdTbody: FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <tbody
    className={cn(
      "bg-white dark:bg-neutral-800 divide-y text-center divide-neutral-200 dark:divide-neutral-900",
      className
    )}
    {...props}
  />
);

export const MdTr: FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => (
  <tr
    className={cn("even:bg-neutral-50 dark:even:bg-neutral-900", className)}
    {...props}
  />
);

export const MdTh: FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <th
    className={cn(
      "px-4 py-2 font-medium text-neutral-800 dark:text-neutral-100",
      className
    )}
    {...props}
  />
);

export const MdTd: FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <td
    className={cn(
      "px-4 py-2 text-neutral-900 max-w-60  overflow-scroll dark:text-neutral-300",
      className
    )}
    {...props}
  />
);
