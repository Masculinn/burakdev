import { Mq1 } from "@/components/custom-animated-texts";
import Timeline from "@/components/timeline";
import textConfig from "@/constants/text.config";
import type { TextAnimatorProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import MotionText from "@/motion/motion-text";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import type { FC } from "react";

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
          wrapperClassName="md:text-7xl text-6xl text-start font-extrabold tracking-tighter line-clamp-5"
        >
          Hi there!
        </MotionText>
        <br />
        <p className="text-start leading-relaxed pt-6 inline">
          I'm proud to be a <TextAnimator {...textConfig[0]} />
          over <Mq1 delay={2} /> of immersive experience in the agile industries
          based on <TextAnimator {...textConfig[1]} />. Dedicated to delivering{" "}
          <TextAnimator {...textConfig[2]} />{" "}
          <span className="text-muted-foreground">- kinda like a psycho -</span>{" "}
          and <TextAnimator {...textConfig[3]} /> that align with{" "}
          <TextAnimator {...textConfig[4]} />.
        </p>
        <br />
        <br />
        <p className="text-start leading-relaxed  inline">
          I was a lead SWE at Atlantic and EDM. I'm open to new challenges and
          currently working on <TextAnimator {...textConfig[5]} /> that scale. I
          also maintain an{" "}
          <Link
            href="https://github.com/Motion-Provider"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-muted-foreground hover:text-primary transition-colors"
          >
            open-source animation library
          </Link>
          . In my free time, I play the piano 🎹, write articles about the web.
        </p>
        <section className="md:pt-14 pt-10 relative w-full">
          <h2 className="text-3xl md:text-4xl tracking-tight">
            Timeline Of My Journey
          </h2>
          <p className="text-sm md:text-base md:max-w-md max-w-2xs pt-4 font-extralight">
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

export const TextAnimator: FC<TextAnimatorProps> = ({
  children,
  className,
  elementType,
  ...props
}) => (
  <MotionText
    elementType={elementType ?? "span"}
    wrapperClassName={cn("inline text-shadow-2xs", className)}
    controller={{
      trigger: true,
    }}
    {...props}
  >
    {children}
  </MotionText>
);
