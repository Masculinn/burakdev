import { NotFoundCircle } from "@/components/blogs/posts/not-found";
import MotionText from "@/motion/motion-text";
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
        <MotionText
          elementType={"h2"}
          animation={{
            mode: ["fadeIn", "filterBlurIn", "flash"],
            transition: "fadeRotate",
            duration: 1,
          }}
          config={{
            duration: 0.08,
            mode: "chars",
            delayLogic: "linear",
          }}
          wrapperClassName="md:text-5xl text-3xl font-extrabold tracking-tighter leading pb-2 z-10"
        >
          - 404 -
        </MotionText>
        <p className="text-muted-foreground max-w-md pb-2">
          Oops, looks like this page is not exist.
        </p>
      </div>
      <NotFoundCircle className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/6" />
    </>
  );
}
