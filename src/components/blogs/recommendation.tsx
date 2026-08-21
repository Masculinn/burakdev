import type { BlogType } from "@/interfaces";
import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionContainer } from "@/motion/components/motion-container";
import { MotionText } from "@/motion/components/motion-text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import BlogCard from "./posts/card";

const recommendationAnimation = getAnimation("recommendation");

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
    <section className="w-full h-auto my-6">
      <MotionText {...recommendationAnimation}>Continue reading.</MotionText>
      <div className="w-full h-max relative scrollbar-custom overflow-x-scroll overflow-y-hidden">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          {filteredBlogs.map((val) => (
            <BlogCard {...val} key={val.id} isRecent={false} />
          ))}
          <PromoCard blogs={blogs} />
        </div>
      </div>
    </section>
  );
}

const { animation, ...animationProps } = getAnimation("promoCard");
const textAnimation = getAnimation("promoCardText");
const btnAnimation = getAnimation("promoCardBtn");

function PromoCard({ blogs }: { blogs: BlogType[] }) {
  return (
    <Card className="md:max-h-100 shrink-0 md:h-auto h-60 py-0 bg-bg md:w-96 w-full items-center justify-center flex relative overflow-hidden">
      <div className="absolute top-0 left-0 size-full grid grid-cols-3 -z-20">
        {[0, 1].map(() =>
          blogs.map(({ banner_image }, idx) => (
            <MotionContainer
              key={banner_image}
              animation={{
                delay: 0.1 * idx,
                ...animation,
              }}
              {...animationProps}
            >
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
            </MotionContainer>
          )),
        )}
      </div>
      <div className="size-full bg-linear-to-b from-background to-background/50 items-center justify-center flex flex-col text-center ">
        <MotionText {...textAnimation}>justc0de_sessions</MotionText>
        <Link href="/blogs" className="mt-3">
          <MotionContainer {...btnAnimation}>
            <Button
              size="lg"
              className="z-50"
              variant={"outline"}
              aria-label="View all posts"
            >
              <span>View All Posts</span> <ArrowRight />
            </Button>
          </MotionContainer>
        </Link>
      </div>
    </Card>
  );
}
export default Recommendation;
