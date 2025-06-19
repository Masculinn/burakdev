import { FC, Fragment, useEffect, useState } from "react";
import MotionQueue from "../MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, ReduxThemeProps } from "@/interfaces";
import { db } from "@/db";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const getAnimation = ({
  length,
}: {
  length: number;
}): AnimationQueueAnimationProps[] => {
  return Array.from({ length: length }).fill({
    mode: ["fadeRight", "filterBlurIn"],
    duration: 1,
    transition: "smooth",
  }) as AnimationQueueAnimationProps[];
};

const title = "Continue with Trends.".split(/\s+/);
const Reccomendation: FC = () => {
  const currentPost = useSelector((state: { blog: BlogPost }) => state.blog);
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.from("blog_posts").select("*");
        if (error) throw error;
        if (data) {
          const filteredPost = data.filter(
            (post) => post.id !== currentPost.id
          );
          setPosts(filteredPost.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (posts.length === 0) fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20  items-center justify-center flex lg:flex-row flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className={cn("size-72 ", theme)} />
        ))}
      </div>
    );
  }
  return (
    <div className={cn("w-full py-20", theme)}>
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <div className="flex flex-wrap gap-2 w-full">
            <MotionQueue
              isDynamicallyQueued
              delayLogic="linear"
              duration={0.25}
              elementType="h4"
              animations={
                getAnimation({
                  length: title.length,
                }) as AnimationQueueAnimationProps[]
              }
              children={title.map((item, i) => (
                <Fragment key={`item-${i}`}>{item}</Fragment>
              ))}
              className="text-3xl lg:text-5xl tracking-tighter text-left font-regular "
            />
          </div>
          <Link href="/blogs">
            <Button className="gap-4" variant="ghost">
              Explore the Journal <MoveRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MotionQueue
            isDynamicallyQueued
            delayLogic="linear"
            duration={0.25}
            elementType="div"
            animations={
              posts.map(
                (_) =>
                  ({
                    mode: ["fadeRight"],
                    duration: 1,
                    transition: "smooth",
                  } as AnimationQueueAnimationProps)
              ) as AnimationQueueAnimationProps[]
            }
            children={posts.map((val) => (
              <div key={val.id} className="size-72 group">
                <Image
                  src={val.banner_image}
                  alt="feauture"
                  height={500}
                  width={500}
                  className="rounded-md aspect-video mb-4"
                />
                <h3 className="text-xl tracking-tight group-hover:underline underline-offset-2 ">
                  {val.title}
                </h3>
                <p className="text-stone-800 tracking-tighter text-base group-hover:underline underline-offset-2 dark:group-hover:text-stone-400 group-hover:text-black ">
                  {val.description}
                </p>
                <p className="text-stone-800 tracking-tighter text-base">
                  {new Date(val.published_at).toLocaleDateString()}
                </p>
              </div>
            ))}
            className="flex flex-col gap-2 hover:opacity-75 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Reccomendation;
