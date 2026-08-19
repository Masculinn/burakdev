import Timeline from "@/components/timeline";
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
        <p className="text-start leading-relaxed inline text-blog-muted">
          Hi 👋 I&apos;m a full-stack software engineer with 5+ years of
          experience delivering resilient, production-grade web platforms across
          fast-paced industries — based in Warsaw.
        </p>
        <p className="text-start leading-relaxed text-blog-muted pt-2">
          Over the years, I&apos;ve honed my craft in building clean, reliable
          codebases and intuitive interfaces that meet — and exceed —
          organizational goals.
        </p>
        <p className="text-start leading-relaxed text-blog-muted pt-2">
          I&apos;ve sharpened my skills as a lead SWE at Atlantic and EDM.
          Today, I maintain an{" "}
          <Link
            href="https://github.com/Motion-Provider"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blog-muted font-bold tracking-tighter hover:text-primary transition-colors underline-offset-[3px]"
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
