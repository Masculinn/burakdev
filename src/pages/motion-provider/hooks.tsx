import Head from "next/head";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { PerformanceCardDataProps, ReduxThemeProps } from "@/interfaces";
import documentationLib from "@/lib/documentation.lib";
import {
  BookOpen,
  Combine,
  GitMerge,
  RotateCcw,
  Timer,
  Zap,
} from "lucide-react";
import { FC } from "react";
import { useSelector } from "react-redux";
import CodeProvider from "@/components/Documentation/code-provider";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import Link from "next/link";
import { CodeBadge } from "@/components/Documentation/code-badge";

export default function MotionProviderHooks() {
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();
  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Core Hooks</title>
        <meta
          name="description"
          content="Discover the core features of our React animation library."
        />
        <meta property="og:title" content="Motion Provider - Core Hooks" />
        <meta
          property="og:description"
          content="Discover the core features of our React animation library."
        />
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className="mb-12 mt-8">
          <h1 className="lg:text-3xl text-2xl font-bold ">
            Motion Provider Core Hooks
          </h1>
          <p className="text-muted-foreground tracking-tight pt-2">
            Motion Provider provides a set of core hooks for creating complex
            animations. There are 2 essential hook in Motion Provider:{" "}
          </p>
        </section>
        <section className="mb-12">
          <h2 className="lg:text-2xl text-lg font-bold mb-4">
            <pre>useAnimationMixer()</pre>
          </h2>
          <p className="mb-4 text-muted-foreground tracking-tight">
            Composes multiple animations into a unified animation configuration.
          </p>

          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <Combine className="h-6 w-6 text-purple-500" />
              <span className="lg:text-lg text-base font-bold">
                Key Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>Deep merges animation properties</li>
                <li>Handles reverse animation states</li>
                <li>Type-safe animation composition</li>
                <li>Memoized output for performance</li>
              </ul>
            </AlertDescription>
          </Alert>
          <section className="mb-12">
            <h3 className="text-2xl font-bold mt-8 mb-4">Basic Usage</h3>
            <CodeProvider
              code={documentationLib.useAnimationMixer.code}
              appTheme={theme}
              bordered
              rounded
              fontSize={fontSize}
              lang="typescript"
            />
            <h3 className="text-xl font-bold mt-8 mb-4">Parameters</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>animations</TableCell>
                    <TableCell>
                      <CodeBadge code="AnimationObjProps[]" />
                    </TableCell>
                    <TableCell>Array of animation objects to combine</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>reverse</TableCell>
                    <TableCell>
                      <CodeBadge code="boolean" />
                    </TableCell>
                    <TableCell>
                      Creates a mirror effect by reversing the order of the
                      animations with opacity effect
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </section>

        <section className="mb-12">
          <h2 className="lg:text-2xl text-lg font-bold mb-4">
            <pre>useAnimation()</pre>
          </h2>
          <p className="mb-4 text-muted-foreground tracking-tight">
            Controls animation playback states with debounced updates.
          </p>

          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-500" />
              <span className="lg:text-lg text-base font-bold">
                Key Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>Debounced state updates</li>
                <li>Animation reversal support</li>
                <li>Emergency stop functionality</li>
                <li>Cleanup handlers</li>
              </ul>
            </AlertDescription>
          </Alert>
          <h3 className="text-xl lg:text-2xl font-bold mb-4">Basic Usage</h3>
          <CodeProvider
            code={documentationLib.useAnimation.code}
            appTheme={theme}
            bordered
            rounded
            fontSize={fontSize}
            lang="typescript"
          />

          <h3 className="text-xl font-bold mt-8 mb-4">Parameters</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>stopAnimation</TableCell>
                  <TableCell>
                    <CodeBadge code="boolean" />
                  </TableCell>
                  <TableCell>Freeze all animations when true</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>reverseAnimation</TableCell>
                  <TableCell>
                    <CodeBadge code="boolean" />
                  </TableCell>
                  <TableCell>Reverse animation direction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>recallDuration</TableCell>
                  <TableCell>
                    <CodeBadge code="number" />
                  </TableCell>
                  <TableCell>Debounce timeout in milliseconds</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Hook Best Practices</h3>
          <Cards />
        </section>
      </div>
    </>
  );
}

const Cards: FC = () => {
  const data = [
    {
      icon: <Timer className="w-5 h-5 text-green-500" />,
      title: "Timing Control",
      desc: (
        <ul className="list-disc pl-6">
          <li>Use recallDuration between 100-500ms</li>
          <li>Avoid multiple state updates in rapid succession</li>
        </ul>
      ),
    },
    {
      icon: <GitMerge className="w-5 h-5 text-blue-500" />,
      title: "Composition",
      desc: (
        <ul className="list-disc pl-6">
          <li>Combine 3-4 animations max in useAnimationMixer</li>
          <li>Memoize input animations array</li>
        </ul>
      ),
    },
    {
      icon: <BookOpen className="w-5 h-5  text-red-500" />,
      title: "Learn CAS",
      desc: (
        <div className="text-sm text-muted-foreground">
          If you would like to learn how to control your animations like
          <CodeBadge code="reverse" /> <CodeBadge code="stop" />{" "}
          <CodeBadge code="control" />
          efficiently using react hooks{" "}
          <Link
            className="underline underline-offset-2 hover:text-primary"
            href="/motion-provider/centralized-animation-system"
          >
            check the documentation on this page
          </Link>
        </div>
      ),
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-red-500" />,
      title: "Anti-Patterns",
      desc: (
        <ul className="list-disc pl-6">
          <li>Don't use in render-heavy components</li>
          <li>Avoid nested hook calls</li>
          <li>Don't mutate returned animation config</li>
        </ul>
      ),
    },
  ] as PerformanceCardDataProps[];

  const rightFadeInMode = ["filterBlurIn", "fadeUp", "rotateFlipX"];
  const leftFadeInMode = ["filterBlurIn", "fadeDown", "rotateFlipX"];

  const animations = Array.from({ length: data.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "quickEaseInOut",
  })) as AnimationQueueAnimationProps[];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MotionQueue
        isDynamicallyQueued
        elementType="div"
        animations={animations}
        children={data.map((item, idx) => (
          <Alert
            key={idx}
            variant={idx === data.length - 1 ? "destructive" : "default"}
          >
            <AlertTitle className="flex items-center gap-2">
              {item.icon}
              <span>{item.title}</span>
            </AlertTitle>
            <AlertDescription className="mt-2">{item.desc}</AlertDescription>
          </Alert>
        ))}
      />
    </div>
  );
};
