import { LqipImage } from "@/components/lqip-image";
import { TransitionLink } from "@/components/transition-link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import type { BlogType } from "@/interfaces";
import MotionContainer from "@/motion/motion-container";
import { convertToSlug } from "@/utils/convertToSlug";
import { PostDifficulty } from "../post-difficulty";

export function BlogCard({
  banner_image,
  description,
  published_at,
  id,
  tags,
  title,
  level,
  isRecent = false,
}: BlogType & { isRecent?: boolean }) {
  const isMobile = useIsMobile();

  const date = new Date(published_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const slug = `/blogs/${convertToSlug(title)}`;

  const delay = (id % 0.22) + (isMobile ? 0.15 : 0.25);

  return (
    <TransitionLink href={slug} className="relative">
      <MotionContainer
        animation={{
          mode: [
            !isMobile ? "fadeUp" : id % 2 === 0 ? "fadeRight" : "fadeLeft",
            "filterBlurIn",
          ],
          transition: "gentle",
          delay,
        }}
        controller={{
          configView: {
            amount: 0.25,
            once: false,
          },
        }}
        elementType="div"
        className="relative"
      >
        <Card className="overflow-hidden relative md:max-h-100 h-auto py-0 bg-bg group cursor-pointer fade-in">
          <PostDifficulty
            level={level}
            clasName="z-50 text-xs top-4 left-4 absolute"
            style={{ viewTransitionName: `post-badge-${id}` }}
          />
          {isRecent && (
            <Badge
              className="absolute top-4 right-4 z-50"
              variant="destructive"
            >
              New Session!
            </Badge>
          )}
          <CardHeader className="p-0 m-0 relative h-60 w-full">
            <LqipImage
              fill
              loading="lazy"
              fetchPriority="auto"
              src={banner_image}
              alt={title}
              className="object-cover inset-0 z-0 object-center absolute top-0 left-0 size-full"
              style={{ viewTransitionName: `post-cover-${id}` }}
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
                />
              </svg>
            </div>
          </CardHeader>
          <CardContent className="py-0 px-4 group-hover:underline underline-offset-2 decoration-muted-foreground">
            <CardTitle
              className="text-lg font-semibold tracking-tighter"
              style={{ viewTransitionName: `post-title-${id}` }}
            >
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground md:line-clamp-2 md:pt-0 pt-2">
              {description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center-safe p-4">
            <div className="flex flex-wrap gap-1 md:w-72 w-48 shrink-0 ">
              {tags?.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
            <Badge variant="primary">
              <time className="font-secondary tabular-nums tracking-tight text-xs">
                {date}
              </time>
            </Badge>
          </CardFooter>
        </Card>
      </MotionContainer>
    </TransitionLink>
  );
}

export default BlogCard;
