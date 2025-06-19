import ImageMotionEngine from "@/components/MotionProvider/motion-image-engine";
import Head from "next/head";

export default function MotionImageEngine() {
  return (
    <>
      <Head>
        <title>Motion Provider - Motion Image Engine</title>
        <meta
          name="description"
          content="Image Animation generator powered by Motion Provider"
        />
        <meta
          property="og:title"
          content="Motion Provider - Motion Image Engine"
        />
        <meta
          property="og:description"
          content="Image Animation generator powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/motion-image-engine"
        />
      </Head>
      <h2 className="lg:text-3xl font-bold text-2xl self-center">
        Motion Image Engine
      </h2>
      <p className="dark:text-neutral-300 text-base lg:pt-6 pt-4">
        Configure your dynamic image animation, test and copy easily in couple
        of clicks!
      </p>
      <ImageMotionEngine />
    </>
  );
}
