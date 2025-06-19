import MotionEngine from "@/components/MotionProvider/motion-engine";
import Head from "next/head";

export default function Engine() {
  return (
    <>
      <Head>
        <title>Motion Provider - Motion Engine</title>
        <meta
          name="description"
          content="Animation generator powered by Motion Provider"
        />
        <meta property="og:title" content="Motion Provider - Motion Engine" />
        <meta
          property="og:description"
          content="Animation generator powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/motion-engine"
        />
      </Head>
      <h2 className="lg:text-3xl font-bold text-2xl self-center">
        Motion Engine
      </h2>
      <p className="dark:text-neutral-300 text-base lg:pt-6 pt-4">
        To make everything easier, Motion Provider provides a motion engine that
        you can use to create your own custom animations in one click!
      </p>
      <MotionEngine
        configView={{ once: false, amount: 0.5 }}
        children={<h1 className="text-3xl font-bold">Hello There!</h1>}
        elementType={"div"}
        isControlled={{ trigger: true }}
        mode={["filterBlurIn", "fadeRight", "rotateFlipY"]}
        transition="smooth"
      />
    </>
  );
}
