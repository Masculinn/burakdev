import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlogSort } from "@/hooks/use-posts";
import type { BlogPostSortProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";

type SortItemType = {
  label: string;
  value: BlogPostSortProps;
};

const sortItems = [
  {
    label: "New to old",
    value: "new-to-old",
  },
  {
    label: "Old to new",
    value: "old-to-new",
  },
  {
    label: "A - Z",
    value: "a-z",
  },
  {
    label: "Z - A",
    value: "z-a",
  },
] as const satisfies SortItemType[];

export default function Sort({ className }: { className?: string }) {
  const { setSort } = useBlogSort();

  const handleValueChange = (val: BlogPostSortProps) => setSort(val);

  return (
    <div className={cn("relative", className)}>
      <Select onValueChange={handleValueChange} name="blog sort by date">
        <Button
          variant="ghost"
          className="bg-muted/50"
          aria-label="Sort"
          nativeButton={false}
          render={
            <SelectTrigger className="w-auto">
              <SelectValue placeholder={<Filter className="size-4" />} />
            </SelectTrigger>
          }
        />
        <SelectContent>
          {sortItems.map((val) => (
            <SelectItem key={val.value} value={val.value}>
              {val.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
