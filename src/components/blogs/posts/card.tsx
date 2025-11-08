import { LqipImage } from "@/components/lqip-image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BlogType } from "@/interfaces";
import { convertToSlug, getDate } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";
import { PostDifficulty } from "../post-difficulty";

type BlogCardProps = BlogType & { isRecent?: boolean };

const BlogCard = ({ ...props }: BlogCardProps & { isEager: boolean }) => {
  const {
    banner_image,
    description,
    published_at,
    tags,
    title,
    level,
    isRecent = false,
    isEager,
  } = props;

  const date = getDate(published_at).toLocaleDateString();
  const slug = convertToSlug(title);
  return (
    <Link href={`/blogs/${slug}`}>
      <Card className="overflow-hidden relative md:max-h-[400px] h-auto py-0 bg-bg group cursor-pointer">
        <PostDifficulty
          level={level}
          clasName="z-50 text-xs top-4 left-4 absolute"
        />
        {isRecent && (
          <Badge className="absolute top-4 right-4 z-50" variant="destructive">
            New Session!
          </Badge>
        )}
        <CardHeader className="p-0 m-0 relative h-60 w-full">
          <LqipImage
            fill
            method="base64"
            loading="lazy"
            fetchPriority={isEager ? "high" : "auto"}
            src={banner_image}
            alt={title}
            className="object-cover inset-0 z-0 object-center absolute top-0 left-0 size-full"
          />
          <div className="blog-card-shape-divider">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <title>image shape divider</title>
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </CardHeader>
        <CardContent className="py-0 px-4 group-hover:underline underline-offset-2 decoration-muted-foreground">
          <CardTitle className="text-lg font-semibold tracking-tighter">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground md:line-clamp-2">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center-safe p-4">
          <div className="flex flex-wrap gap-1 md:w-72 w-48 shrink-0 ">
            {tags?.map((t, i) => (
              <Badge key={i} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <p className="text-sm font-secondary">{date}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default memo(BlogCard);
