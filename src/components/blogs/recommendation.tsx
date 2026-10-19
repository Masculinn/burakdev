import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import type { BlogType } from "@/interfaces";
import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionText } from "@/motion/components/motion-text";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { BlogCard } from "./posts/card";

function Recommendation({
  blogs,
  currentBlogID,
}: {
  blogs: BlogType[];
  currentBlogID: number;
}) {
  const filteredBlogs = blogs
    .filter(({ id }) => id !== currentBlogID)
    .slice(0, 3);

  if (filteredBlogs.length === 0) return null;
  return (
    <section className="w-full h-auto my-6 md:px-8">
      <MotionText
        {...getAnimation("recommendation")}
        wrapperClassName="font-bold tracking-tighter max-w-2xl text-shadow-2xs text-4xl md:text-5xl md:pt-12 md:pb-8 pt-6 pb-8 z-10"
      >
        Continue reading.
      </MotionText>
      <div className="w-full h-max relative scrollbar-custom overflow-x-scroll overflow-y-hidden">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          {filteredBlogs.map((val, idx) => (
            <BlogCard idx={idx + 1} key={val.id} {...val} />
          ))}
          <PromoCard blogs={blogs} />
        </div>
      </div>
    </section>
  );
}

function PromoCard({ blogs }: { blogs: BlogType[] }) {
  const isReducedMotion = usePrefersReducedMotion();
  if (isReducedMotion) return null;

  return (
    <Card className="md:max-h-100 shrink-0 md:h-auto h-60 py-0 bg-bg md:w-96 w-full items-center justify-center flex relative overflow-hidden md:mt-0 mt-8">
      <div className="absolute top-0 left-0 size-full grid grid-cols-3 -z-20">
        {[0, 1].map(() =>
          blogs.map(({ banner_image }) => (
            <div key={banner_image} className="scale-110">
              <AspectRatio
                ratio={1 / 1}
                key={banner_image}
                className="size-auto -skew-6"
              >
                <LqipImage
                  fill
                  className="object-cover rounded-md"
                  alt="banner"
                  src={banner_image}
                />
              </AspectRatio>
            </div>
          )),
        )}
      </div>
      <div className="size-full bg-linear-to-b from-background to-background/50 items-center justify-center flex flex-col text-center ">
        <Link href="/blogs" className="mt-3">
          <Button
            size="lg"
            className="z-50"
            variant="outline"
            aria-label="View all posts"
          >
            <span>View All Posts</span> <ArrowUpRightIcon />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
export default Recommendation;
