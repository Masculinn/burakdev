import React from "react";
import Head from "next/head";
import { Info } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import timelineConfig from "@/lib/timeline.config";
import MotionContainer from "@/components/MotionProvider/motion-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Software engineer Burak Bilen's Portfolio Web Application. Full-Stack Mid-Level
        Application Engineer with 5+ years of experience specializing in
        frontend & backend development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Software engineer Burak Bilen's Portfolio Web Application"
        />
        <meta
          property="og:description"
          content="Full-Stack Mid-Level
        Application Engineer with 5+ years of experience specializing in 
        frontend & backend development"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://burakdev.com/me.jpg" />
        <meta property="og:url" content="https://burakdev.com/" />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <MotionContainer
        elementType="div"
        duration={1}
        transition="easeOut"
        mode={["filterBlurIn", "fadeIn"]}
        className="overflow-hidden"
        configView={{ once: true, amount: 0.5 }}
      >
        <h2 className="lg:text-6xl text-5xl text-start font-extrabold tracking-tighter line-clamp-5 text-clip overflow-clip">
          Hey there 👋
        </h2>
      </MotionContainer>
      <p className="text-start leading-relaxed lg:pt-8 pt-6">
        Here is a little bit about me. I'm a results-driven Full-Stack Mid-Level
        Application Engineer with 5+ years of experience specializing in
        frontend & backend development, particularly with the techs shown below.
        I'm passionate about crafting responsive, high-performing, and
        user-friendly web applications and services. I'm proficient in
        translating client needs into innovative technical solutions, optimizing
        for performance, and ensuring seamless cross-browser compatibility while
        maintaining scalability. I chose to pursue independent learning and
        professional development after graduating from my Computer Engineering
        degree program at Managerial Academy of Applied Sciences in Warsaw
      </p>

      <Alert className="animate-in fade-in-0 duration-500 mt-4 p-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Fun Fact!</AlertTitle>
        <AlertDescription>
          I do not like light mode at all. However I built light-dark mode
          switcher at the top right corner for you guys. Try it out!
        </AlertDescription>
      </Alert>
      <Timeline data={timelineConfig} />
    </>
  );
}
