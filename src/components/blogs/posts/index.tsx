import { BLOG_CONTEXT } from "@/constants/ctx.config";
import { useBlogSearch, useBlogSort, useBlogTags } from "@/hooks/use-posts";
import type { BlogPostSortProps, BlogType } from "@/interfaces";
import MotionChain from "@/motion/motion-chain";
import type { MotionAnimationProps } from "@/motion/types";
import { useDebounce } from "@uidotdev/usehooks";
import BlogCard from "./card";
import NotFound from "./not-found";

const { tags: defaultTags } = BLOG_CONTEXT;

function areSameSet(a: string[], b: string[]) {
  return a.length === b.length && a.every((v) => b.includes(v));
}

export function isRecent(date: string, days: number = 3): boolean {
  const now = Date.now();
  const _date = new Date(date).getTime();
  const msperDay = 24 * 60 * 60 * 1000;
  const diff = now - _date;
  return diff >= 0 && diff < days * msperDay;
}

function getFilteredAndSortedPosts(
  posts: BlogType[],
  selectedTags: string[],
  search: string,
  sort: BlogPostSortProps,
): BlogType[] {
  const isDefaultFilter = areSameSet(selectedTags, defaultTags);

  let result = isDefaultFilter
    ? posts
    : posts.filter(({ tags: postTags }) =>
        selectedTags.every((t) => postTags.includes(t)),
      );

  if (search !== "") {
    const q = search.trim().toLowerCase();
    result = result.filter(
      ({ title, description }) =>
        title.trim().toLowerCase().includes(q) ||
        description.trim().toLowerCase().includes(q),
    );
  }

  const sorted = [...result];

  switch (sort) {
    case "old-to-new":
      sorted.sort(
        (a, b) =>
          new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime(),
      );
      break;
    case "new-to-old":
      sorted.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      );
      break;
    case "a-z":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return sorted;
}

function getRecentPostIds(posts: BlogType[], days = 3): Set<number> {
  const ids = new Set<number>();
  for (const p of posts) {
    try {
      if (isRecent(p.published_at, days)) ids.add(p.id);
    } catch {}
  }
  return ids;
}
function BlogPosts({ posts }: { posts: BlogType[] }) {
  const { selectedTags } = useBlogTags();
  const { search } = useBlogSearch();
  const { sort } = useBlogSort();
  const debouncedSearch = useDebounce(search, 250);

  const filteredPosts = getFilteredAndSortedPosts(
    posts,
    selectedTags,
    debouncedSearch,
    sort,
  );
  const recentIds = getRecentPostIds(filteredPosts);

  const animations: MotionAnimationProps[] = filteredPosts.map(() => ({
    mode: ["fadeIn", "filterBlurIn"],
    transition: "gentle",
    duration: 1,
  }));

  if (!filteredPosts.length) return <NotFound />;

  return (
    <section className="w-full h-auto grid md:grid-cols-2 grid-cols-1 my-4 gap-4 relative z-10">
      <MotionChain
        animations={animations}
        config={{
          duration: 0.5,
          delayLogic: "linear",
          customLogic: (index: number) => index * 0.1,
        }}
        controller={{
          configView: { once: true, amount: 0.25 },
        }}
        elementType="div"
      >
        {filteredPosts.map((post, idx) => (
          <BlogCard
            {...post}
            key={post.id}
            isEager={idx === 0 || idx === 1}
            isRecent={recentIds.has(post.id)}
          />
        ))}
      </MotionChain>
    </section>
  );
}

export default BlogPosts;
