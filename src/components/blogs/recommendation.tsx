import type { BlogType } from "@/interfaces";
import MotionContainer from "@/motion/motion-container";
import MotionText from "@/motion/motion-text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { LqipImage } from "../lqip-image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import BlogCard from "./posts/card";

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
      <MotionText
        animation={{
          mode: ["fadeUp", "filterBlurIn"],
          transition: "cubicBounce",
          duration: 1,
        }}
        config={{
          duration: 0.08,
          mode: "words",
          delayLogic: "linear",
        }}
        elementType="h2"
        className="font-bold tracking-tighter max-w-2xl text-shadow-2xs text-4xl md:text-5xl md:pt-12 md:pb-8 py-6"
      >
        Continue reading.
      </MotionText>
      <ScrollArea className="w-full h-max relative">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          {filteredBlogs.map((val) => (
            <BlogCard isEager={false} {...val} key={val.id} isRecent={false} />
          ))}
          <ViewAllCard blogs={blogs} />
        </div>
        <ScrollBar orientation="horizontal" className="md:flex hidden" />
      </ScrollArea>
    </section>
  );
}

function ViewAllCard({ blogs }: { blogs: BlogType[] }) {
  return (
    <Card className="md:max-h-[400px] shrink-0 md:h-auto h-60 py-0 bg-bg md:w-96 w-full items-center justify-center flex relative overflow-hidden">
      <div className="absolute top-0 left-0 size-full grid grid-cols-3 -z-20">
        {[0, 1].map(() =>
          blogs.map(({ banner_image }, idx) => (
            <MotionContainer
              key={banner_image}
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                transition: "cubicBounce",
                duration: 1,
                delay: 0.1 * idx,
              }}
              controller={{
                configView: {
                  once: false,
                  amount: 0.25,
                },
              }}
              elementType="div"
              className="scale-110"
            >
              <AspectRatio
                ratio={1 / 1}
                key={banner_image}
                className="size-auto -skew-6"
              >
                <LqipImage
                  fill
                  method="base64"
                  className="object-cover rounded-md"
                  alt="banner"
                  src={banner_image}
                />
              </AspectRatio>
            </MotionContainer>
          ))
        )}
      </div>
      <div className="size-full bg-linear-to-b from-background to-background/50 items-center justify-center flex flex-col text-center ">
        <MotionContainer
          animation={{
            mode: ["fadeIn", "filterBlurIn"],
            transition: "gentle",
            duration: 1,
            delay: 2.5,
          }}
          elementType={"div"}
          controller={{
            configView: {
              once: false,
              amount: 0.25,
            },
          }}
        >
          <span className="font-secondary text-xs">by Burak Bilen</span>
        </MotionContainer>
        <MotionText
          wrapperClassName=" text-3xl font-secondary"
          animation={{
            mode: ["textShimmer", "transformTextGlow"],
            transition: "linear",
            duration: 1,
            delay: 0.5,
          }}
          elementType="h1"
          config={{
            duration: 0.06,
            mode: "chars",
          }}
          controller={{
            configView: {
              once: false,
              amount: 0.25,
            },
          }}
        >
          justc0de_sessions
        </MotionText>
        <Link href="/blogs" className="mt-3">
          <Button
            size="lg"
            className="z-50"
            variant={"outline"}
            aria-label="View all posts"
          >
            View All Posts <ArrowRight />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
export default memo(Recommendation);
