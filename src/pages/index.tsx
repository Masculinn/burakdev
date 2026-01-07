import { Mq1 } from "@/components/custom-animated-texts";
import Timeline from "@/components/timeline";
import MotionText from "@/motion/motion-text";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";

const Cta = dynamic(() => import("@/components/cta"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Burak Bilen</title>
        <meta
          name="description"
          content="Software engineer Burak Bilen's Portfolio Web Application."
        />
        <meta property="og:title" content="Home | Burak Bilen" />
        <meta property="og:site_name" content="burakdev" />
        <meta
          property="og:description"
          content="Software engineer Burak Bilen's Portfolio Web Application."
        />
      </Head>
      <div>
        <MotionText
          elementType="h1"
          controller={{
            trigger: true,
          }}
          animation={{
            mode: ["filterBlurIn", "fadeUp", "clipUp"],
            transition: "cubicElastic",
            duration: 1,
          }}
          config={{
            mode: "chars",
            duration: 0.08,
            delayLogic: "linear",
          }}
          wrapperClassName="md:text-7xl text-6xl text-start font-extrabold tracking-tighter line-clamp-5 pb-6 pt-2"
        >
          Hi there!
        </MotionText>
        <p className="text-start leading-relaxed inline text-blog-muted">
          I'm proud to be{" "}
          <MotionText
            elementType="span"
            wrapperClassName="inline text-shadow-2xs"
            controller={{
              trigger: true,
            }}
            animation={{
              mode: ["fadeIn"],
              transition: "smooth",
              duration: 1,
              delay: 1,
            }}
            config={{ duration: 0.016, mode: "chars", delayLogic: "linear" }}
            className="inline text-rose-500"
          >
            full-stack software engineer
          </MotionText>
          over <Mq1 delay={2} /> of immersive experience in the agile industries
          based on Warsaw.
        </p>
        <p className="text-start leading-relaxed text-blog-muted pt-2">
          Over the years, I've honed my skills in crafting clean, reliable
          codebases and intuitive interfaces designed to meet and exceed
          organizational goals.
        </p>
        <p className="text-start leading-relaxed text-blog-muted pt-2">
          I’ve worked at Atlantic and EDM refining my skills as a lead SWE.
          Today, I dedicate my time to maintaining an{" "}
          <Link
            href="https://github.com/Motion-Provider"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-muted-foreground font-bold tracking-tighter hover:text-primary transition-colors underline-offset-3 "
          >
            open source animation library
          </Link>{" "}
          called Motion-Provider.
        </p>
        <section className="md:pt-14 pt-10 relative w-full">
          <h2 className="text-3xl md:text-4xl tracking-tight">
            Timeline Of My Journey
          </h2>
          <p className="text-sm md:text-base md:max-w-md text-blog-muted max-w-2xs pt-4 font-extralight">
            Here is my carreer timeline in a nutshell for the past 5 years.
            Including the major project assets and useful links with associated
            descriptions.
          </p>
          <Timeline />
        </section>
        <Cta />
      </div>
    </>
  );
}
