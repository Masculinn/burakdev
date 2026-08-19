import { Button } from "@/components/ui/button";
import { useBlogSearch } from "@/hooks/use-posts";
import { cn } from "@/lib/utils";
import { Search as IconSearch, X } from "lucide-react";
import { Input } from "../../ui/input";

function Search({ className }: { className?: string }) {
  const { search, setSearch } = useBlogSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.toLowerCase());

  return (
    <div className={cn("relative w-1/2", className)}>
      <IconSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
      />

      <Input
        type="text"
        placeholder="Search a keyword..."
        value={search}
        onChange={handleSearch}
        className="w-full pl-10 bg-muted/50"
        accept="text/plain"
        autoComplete="off"
        aria-label="Search posts"
      />
      <Button
        onClick={() => setSearch("")}
        variant="ghost"
        aria-label="Clear search"
        className="absolute right-3 top-1/2 -translate-y-1/2  size-6 rounded-full text-muted-foreground"
      >
        <X aria-hidden="true" />
      </Button>
    </div>
  );
}

export default Search;
