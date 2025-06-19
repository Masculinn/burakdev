import { BlogPost, PingProps } from "@/interfaces";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Ping from "../ui/ping";

const BlogCard: FC<BlogPost> = (props) => {
  const {
    banner_image,
    description,
    level,
    like,
    published_at,
    slug,
    tags,
    title,
    view,
  } = props;

  {
    const publishedDate = new Date(published_at).toLocaleDateString();
    const now = new Date().toLocaleDateString();

    const diff = new Date(now).getTime() - new Date(publishedDate).getTime();
    const isNowadays = diff / (1000 * 60 * 60 * 24) > 1;

    const levelConfig: PingProps = {
      mode: level === 1 ? "success" : level === 2 ? "warning" : "error",
      size: "sm",
      isAnimated: true,
    };
    const blogLevel =
      level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced";

    return (
      <Card
        key={title}
        className="overflow-hidden relative max-h-[400px] h-full "
      >
        <div className="absolute font-mono text-muted-foreground text-xs top-4 left-4 flex gap-2 items-center justify-center z-50">
          <Ping {...levelConfig} />
          <span>{blogLevel}</span>
        </div>
        {isNowadays && (
          <Badge variant={"secondary"} className="absolute top-4 right-4 z-50">
            New Session!
          </Badge>
        )}
        <CardHeader className="p-0 relative">
          <Image
            src={banner_image}
            alt={title}
            width={1200}
            height={600}
            className="object-cover w-full  max-h-48 h-fit transition-all duration-200 group-hover:scale-105"
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4">
          <div className="flex flex-wrap gap-1">
            {tags?.map((_, i) => (
              <Badge key={i} variant="secondary">
                {_}
              </Badge>
            ))}
          </div>
          <p className="text-sm">{publishedDate}</p>
        </CardFooter>
      </Card>
    );
  }
};

export default BlogCard;
