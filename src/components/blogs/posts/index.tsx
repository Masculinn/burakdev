import { BLOG_CONTEXT } from "@/constants/ctx.config";
import { useBlogSearch, useBlogSort, useBlogTags } from "@/hooks/use-posts";
import type { BlogType } from "@/interfaces";
import MotionChain from "@/motion/motion-chain";
import type { MotionAnimationProps } from "@/motion/types";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";
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

function BlogPosts({ posts }: { posts: BlogType[] }) {
  const { selectedTags } = useBlogTags();
  const { search } = useBlogSearch();
  const { sort } = useBlogSort();
  const debouncedSearch = useDebounce(search, 250);

  const filteredPosts = useMemo(() => {
    let _posts: BlogType[] = [...posts];
    if (areSameSet(selectedTags, defaultTags) && debouncedSearch === "")
      _posts = [...posts];
    else if (!areSameSet(selectedTags, defaultTags))
      _posts = posts.filter(({ tags: postTags }) =>
        selectedTags.every((t) => postTags.includes(t)),
      );

    if (debouncedSearch !== "") {
      _posts = _posts.filter(
        ({ title, description }) =>
          title
            .trim()
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()) ||
          description
            .trim()
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase()),
      );
    }

    if (sort === "old-to-new") {
      _posts.sort(
        (a, b) =>
          new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime(),
      );
    }
    if (sort === "new-to-old") {
      _posts.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime(),
      );
    } else if (sort === "a-z") {
      _posts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "z-a") {
      _posts.sort((a, b) => b.title.localeCompare(a.title));
    }
    return _posts;
  }, [posts, selectedTags, debouncedSearch, sort]);

  const [recentIds, setRecentIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ids = new Set<number>();
    const days = 3;

    for (const p of filteredPosts) {
      try {
        if (isRecent(p.published_at, days)) ids.add(p.id);
      } catch {}
    }

    setRecentIds(ids);
  }, [filteredPosts]);

  const animations = useMemo(
    () =>
      filteredPosts.map(() => ({
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
        duration: 1,
      })) as MotionAnimationProps[],
    [filteredPosts],
  );

  const motionConfig = useMemo(
    () => ({
      duration: 0.5,
      delayLogic: "linear" as const,
    }),
    [],
  );

  const customLogic = useCallback((index: number) => index * 0.1, []);
  return (
    <section className="w-full h-auto grid md:grid-cols-2 grid-cols-1 my-4 gap-4 relative z-10">
      {filteredPosts?.length > 0 ? (
        <MotionChain
          animations={animations}
          config={{
            ...motionConfig,
            customLogic,
          }}
          controller={{
            configView: {
              once: true,
              amount: 0.25,
            },
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
      ) : (
        <NotFound />
      )}
    </section>
  );
}

export default BlogPosts;
