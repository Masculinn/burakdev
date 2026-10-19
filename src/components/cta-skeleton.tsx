import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

const pulse = "motion-reduce:animate-none";

export default function CtaSkeleton() {
  return (
    <section
      role="status"
      aria-busy="true"
      className="relative z-50 h-max w-full pt-8"
    >
      <span className="sr-only">Loading section</span>
      <Item
        variant="outline"
        aria-hidden="true"
        className="relative flex-col overflow-hidden md:flex-row"
      >
        <ItemContent>
          <Skeleton className={`${pulse} h-8 w-72 max-w-full`} />
          <div className="flex max-w-2xl flex-col gap-1.5">
            <Skeleton className={`${pulse} h-4 w-full`} />
            <Skeleton className={`${pulse} h-4 w-2/3`} />
          </div>
        </ItemContent>
        <ItemActions className="w-full md:w-auto">
          <Skeleton className={`${pulse} h-8 w-full md:w-36`} />
        </ItemActions>
      </Item>
    </section>
  );
}
