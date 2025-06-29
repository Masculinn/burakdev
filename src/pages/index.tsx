import React from "react";
import Head from "next/head";
import { Timeline } from "@/components/Timeline";
import timelineConfig from "@/lib/timeline.config";
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
        <meta
          property="og:image"
          content="https://burakdev.com/burak-bilen.webp"
        />
        <meta property="og:url" content="https://burakdev.com/" />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <m.h2
        initial={{ y: 20, filter: "blur(5px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="lg:text-6xl text-5xl text-start font-extrabold tracking-tighter line-clamp-5 text-clip overflow-clip"
      >
        Hi there 👋
      </m.h2>
      <p className="text-start leading-relaxed lg:pt-8 pt-6">
        I'm a full-stack software engineer — over 5 years of experience in the
        agile industries, specializing in creating responsive and
        high-performing web applications using modern web technologies. Adept at
        translating client requirements into innovative technical solutions,
        optimizing application performance, and ensuring seamless cross-browser
        compatibility. Dedicated to delivering clean, type-safe, efficient code
        and exceptional user experiences that align with business goals.
      </p>
      <Timeline data={timelineConfig} />
    </>
  );
}
