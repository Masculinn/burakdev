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
        <div className="max-w-3xl">
          <p className="text-start leading-relaxed inline text-blog-muted">
            Hi 👋 I&apos;m a full-stack software engineer with 5+ years of
            experience based in Warsaw delivering state-of-art, production-grade
            solutions on the web across fast-paced industries within TDD and
            agile approaches.
          </p>
          <p className="text-start leading-relaxed text-blog-muted pt-2">
            Over the years, I&apos;ve dedicated myself to build clean, reliable
            codebases and intuitive interfaces that meet project scopes and the
            goals.
          </p>
          <p className="text-start leading-relaxed text-blog-muted pt-2">
            I&apos;ve worked at{" "}
            <Link
              href="https://atlanticvalleypartners.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blog-muted font-semibold tracking-tighter hover:text-primary transition-colors underline-offset-[3px]"
            >
              Atlantic
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.edmbilisim.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blog-muted font-semibold tracking-tighter hover:text-primary transition-colors underline-offset-[3px]"
            >
              EDM
            </Link>
            . Today, I maintain an{" "}
            <Link
              href="https://github.com/Motion-Provider"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blog-muted font-bold tracking-tighter hover:text-primary transition-colors underline-offset-[3px]"
            >
              open source animation library
            </Link>{" "}
            and build an agentic web-scraping pipeline.{" "}
            <Link
              href="mailto:hello@burakdev.com"
              className="text-primary underline-offset-4 underline hover:text-primary/80 font-semibold tracking-tighter"
            >
              Open to new gigs.
            </Link>
          </p>
        </div>
        <section className="md:pt-14 pt-10 relative w-full">
          <h2 className="text-3xl md:text-4xl tracking-tight">
            Timeline Of My Journey
          </h2>
          <p className="text-sm md:text-base md:max-w-md text-blog-muted max-w-2xs pt-4 tracking-tight">
            Here are pretty much all my career experiences from the last 5 years
            along with brief details.
          </p>
          <Timeline />
        </section>
        <Cta />
      </div>
    </>
  );
}
