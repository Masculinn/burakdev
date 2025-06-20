import React from "react";
import Head from "next/head";
import { Info } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import timelineConfig from "@/lib/timeline.config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion as m } from "motion/react";

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

      <m.h2
        initial={{ y: 20, filter: "blur(5px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="lg:text-6xl text-5xl text-start font-extrabold tracking-tighter line-clamp-5 text-clip overflow-clip"
      >
        Hey there 👋
      </m.h2>
      <p className="text-start leading-relaxed lg:pt-8 pt-6">
        Full-stack software engineer — over 5 years of experience in the agile
        industries, specializing in creating responsive and high-performing web
        applications using modern web technologies mainly Next.js. Adept at
        translating client requirements into innovative technical solutions,
        optimizing application performance, and ensuring seamless cross-browser
        compatibility. Dedicated to delivering clean, type-safe, efficient code
        and exceptional user experiences that align with business goals.
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
