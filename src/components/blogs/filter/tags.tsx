import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBlogTags } from "@/hooks/use-posts";
import type { Tag } from "@/interfaces";
import getIcon from "@/lib/getIcon";
import { cn } from "@/lib/utils";
import { Boxes, ListFilterPlus } from "lucide-react";

type TagsProps = {
  isCheckbox?: boolean;
  className?: string;
};

function Tags({ isCheckbox, className }: TagsProps) {
  const { initialTags, selectedTags, setSelectedTags } = useBlogTags();

  function handleCheckedChange(tag: Tag, checked: boolean) {
    const isChecked = Boolean(checked);

    setSelectedTags((prev = []) => {
      let init: Tag[];

      if (isChecked) {
        if (tag === "all") init = ["all"];
        else {
          init = [...prev.filter((t) => t !== "all")];
          if (!init.includes(tag)) init.push(tag);
        }
      } else {
        if (tag === "all") init = [];
        else {
          init = prev.filter((t) => t !== tag);
          if (init.length === 0) init = ["all"];
        }
      }

      return init;
    });
  }

  function handleOnChange(tag: Tag) {
    setSelectedTags((prev = []) => {
      if (tag === "all") return ["all"];

      const isIncluded = prev.includes(tag);
      let init: Tag[];

      if (isIncluded) {
        init = prev.filter((t): t is Tag => t !== tag);
        if (init.length === 0) init = ["all"];
      } else {
        init = [...prev.filter((t): t is Tag => t !== "all")];
        if (!init.includes(tag)) init.push(tag);
      }

      return init;
    });
  }

  if (isCheckbox) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className={cn("w-full bg-muted/50", className)}
            >
              <ListFilterPlus className=" size-4" /> Category
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent className="md:w-56">
          <DropdownMenuLabel>Select categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="max-h-24 md:max-h-48">
            {initialTags.map((tag) => {
              const Icon =
                tag === "all" ? Boxes : getIcon(String(tag).toLowerCase());
              return (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={(selectedTags || []).includes(tag)}
                  onCheckedChange={(c: boolean) => handleCheckedChange(tag, c)}
                >
                  <Icon
                    className="md:size-4 size-4"
                    fill="currentColor"
                    stroke="none"
                  />
                  <span className="capitalize">{tag}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <ScrollArea className={cn("h-auto pb-3 whitespace-nowrap", className)}>
      {initialTags.map((tag) => {
        const Icon = tag === "all" ? Boxes : getIcon(String(tag).toLowerCase());
        return (
          <Button
            key={tag}
            size="sm"
            variant="ghost"
            onClick={() => handleOnChange(tag)}
            className="mr-2"
            render={
              <Badge
                variant={
                  (selectedTags || []).includes(tag) ? "default" : "outline"
                }
              >
                <Icon
                  className="md:size-4 size-4"
                  fill="currentColor"
                  stroke="none"
                />
                <span className="capitalize">{tag}</span>
              </Badge>
            }
          />
        );
      })}
      <ScrollBar orientation="horizontal" className="z-50" />
    </ScrollArea>
  );
}

export default Tags;
