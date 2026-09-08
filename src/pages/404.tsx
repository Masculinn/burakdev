import { NotFoundCircle } from "@/components/blogs/posts/not-found";
import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionText } from "@/motion/components/motion-text";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Page Not Found</title>
        <meta name="description" content="404 | Page Not Found" />
        <meta name="og:description" content="404 | Page Not Found" />
        <meta name="og:title" content="404 | Page Not Found" />
      </Head>
      <div className="w-full h-[80vh] items-center flex flex-col justify-center z-50">
        <MotionText {...getAnimation("notFound")}>- 404 -</MotionText>
        <p className="text-muted-foreground max-w-md pb-2">
          Oops, looks like this page is not exist.
        </p>
      </div>
      <NotFoundCircle className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/6" />
    </>
  );
}
