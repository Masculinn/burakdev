import Head from "next/head";
import Link from "next/link";
import CodeProvider from "@/components/Documentation/code-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import {
  CodeBadgeProps,
  PerformanceCardDataProps,
  ReduxThemeProps,
} from "@/interfaces";
import { useIsMobile } from "@/hooks/use-mobile";
import documentationLib from "@/lib/documentation.lib";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { FC, Fragment } from "react";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
import {
  ArrowRight,
  BadgeInfo,
  Ban,
  BookOpen,
  CheckCheck,
  Cog,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBadge } from "@/components/Documentation/code-badge";

const cards = [
  "Slide",
  "Fade",
  "Zoom/Scale",
  "Rotate",
  "Filter",
  "Custom",
  "Burak's Special",
  "Skew",
  "Staggered",
  "Bounce",
  "3D Translate",
  "Visit Motion Engine For More",
];

export default function ViewAnimationContainerDocs() {
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();

  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Motion Container</title>
        <meta
          name="description"
          content="Discover the core features of our React animation library with Motion Container."
        />
        <meta
          property="og:title"
          content="Motion Provider - Motion Container"
        />
        <meta
          property="og:description"
          content="Discover the core features of our React animation library with Motion Container."
        />
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className="mb-12">
          <h2 className="lg:text-3xl text-xl font-bold mb-4">
            <pre>{"<MotionContainer />"}</pre>
          </h2>
          <p className="mb-4 text-muted-foreground tracking-tight">
            The core animation component providing 65+ predefined animations
            across 11 categories:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <CardsLayout />
          </div>
          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-300" />{" "}
              <span className="lg:text-lg text-base font-bold">
                Key Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>Supports animation combinations and sequencing</li>
                <li>20+ transition easings including custom cubic bezier</li>
                <li>Viewport-triggered animations</li>
                <li>Animation reversal and pausing controls</li>
                <li>Type-safe animation mode declarations</li>
                <li>
                  Supports{" "}
                  <Link
                    href="/motion-provider/centralized-animation-system"
                    className="font-bold underline underline-offset-2 hover:no-underline capitalize"
                  >
                    centralized animation system{"(CAS)"}
                  </Link>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        <section className="mb-12">
          <h3 className="text-xl lg:text-2xl font-bold mb-4">Basic Usage</h3>
          <CodeProvider
            code={documentationLib.motionProviderCompare.code}
            appTheme={theme}
            bordered
            rounded
            fontSize={fontSize}
            lang="typescript"
          />

          <div className="space-y-4 mt-8">
            <h2 className="font-bold text-xl lg:text-2xl">Animation Modes</h2>
            <CodeProvider
              code={documentationLib.animationModes.code}
              appTheme={theme}
              bordered
              rounded
              fontSize={fontSize}
              lang="typescript"
            />
            <p className="text-sm text-muted-foreground">
              Combine as much animations as you want while considering the
              performance conflicts.
            </p>
          </div>
        </section>
        <PropsTable />
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Best Practices</h3>
          <div className="space-y-4">
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-green-500" />{" "}
                <span className="font-bold text-lg">Do's</span>
              </AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-6">
                  <li>Combine 2-3 complementary animations</li>
                  <li>Use viewport triggers for scroll effects</li>
                  <li>
                    Configure, test and copy the animation code, use it in your
                    project in a couple of clicks with{" "}
                    <Link
                      href="/motion-provider/motion-engine"
                      className="font-bold underline underline-offset-2 dark:hover:text-stone-300 hover:text-stone-600"
                    >
                      Motion Engine
                    </Link>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-red-500" />{" "}
                <span className="font-bold text-lg">Don'ts</span>
              </AlertTitle>
              <AlertDescription className="mt-2">
                <ul className="list-disc pl-6 ">
                  <li>
                    Avoid combining conflicting animations such as{" "}
                    <CodeBadge children="['FadeIn', 'FadeOut']" />
                  </li>
                  <li>Don't overload with too many simultaneous animations</li>
                  <li>Avoid long durations for main content</li>
                  <li>
                    Avoid using{" "}
                    <CodeBadge children="animate-*, transition-*, duration-*" />{" "}
                    Tailwind classes inside{" "}
                    <CodeBadge children="<MotionContainer  />" />
                  </li>
                  <li>
                    Escape from callback nested containers instead use custom
                    component like{" "}
                    <Link
                      href="/motion-provider/examples"
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      Nested div fractal animation
                    </Link>
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>
        <PerformanceCards />
      </div>
    </>
  );
}

const CardsLayout: FC = () => {
  const rightFadeInMode = ["filterBlurIn", "fadeRight"];
  const leftFadeInMode = ["filterBlurIn", "fadeLeft"];

  const animations = Array.from({ length: cards.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "cubicElastic",
  })) as AnimationQueueAnimationProps[];

  return (
    <MotionQueue
      elementType="div"
      animations={animations}
      isDynamicallyQueued
      children={cards.map((category, idx) =>
        idx !== cards.length - 1 ? (
          <span className="font-medium text-sm" key={category}>
            {category}
          </span>
        ) : (
          <div
            className="w-full h-full justify-center cursor-pointer rounded-md bg"
            key={category}
          >
            <Link
              className="flex items-center text-center flex-row justify-center gap-2 text-xs underline underline-offset-2 dark:hover:text-stone-300 hover:text-stone-600 dark:text-white text-black font-bold"
              key={category}
              href="/motion-provider/motion-engine"
            >
              <span className="font-medium text-sm">{category} </span>
              <ArrowRight className="w-4 h-4 " />
            </Link>
          </div>
        )
      )}
      className="p-3 border rounded-md bg-muted/50 relative"
    />
  );
};

const PropsTable: FC = () => (
  <section className="mb-12">
    <h3 className="text-xl lg:text-2xl font-bold mb-4">Component Props</h3>
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[120px]">Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow>
            <TableCell className="font-medium">mode</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="AnimationKeys | AnimationKeys[]" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Defines animation {"type(s)"} from 65+ presets. Supports single or
              combined animations.
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>["fadeUp", "rotateFlipX", "filterBlurIn"]</code>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">elementType</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="React.ElementType" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>{"<div />"}</code>
            </TableCell>
            <TableCell>
              HTML element type to render. Supports any valid HTML tag
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>'section'</code>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">transition?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="TransitionKeys" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>smooth</code>
            </TableCell>
            <TableCell>
              Predefined transition timing function. 20+ options available
              including custom cubic bezier curves.
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>'cubicBounce'</code>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">delay?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="number" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>0</code>
            </TableCell>
            <TableCell>
              Initial delay before animation starts (in seconds). Supports
              decimal values for sub-second timing.
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>0.3</code> for 300ms delay
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">duration?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="number" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>0.5</code>
            </TableCell>
            <TableCell>
              Total animation duration in seconds. Overrides transition preset
              duration when specified.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">reverse?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="boolean" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>false</code>
            </TableCell>
            <TableCell>
              Reverses animation direction. When true, plays animation from end
              to start state.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">isControlled?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="AnimationController" />
            </TableCell>
            <TableCell className="text-muted-foreground">false</TableCell>
            <TableCell>
              External animation control. Accepts boolean or object with{" "}
              <code>trigger</code> property.
              <div className="mt-1 text-xs text-muted-foreground">
                Object format: <code>{`{ trigger: boolean }`}</code>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">configView?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="UseInViewOptions" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>{`{ once: true, amount: 0.5 }`}</code>
            </TableCell>
            <TableCell>
              Intersection Observer configuration for viewport detection.
              <div className="mt-1 text-xs text-muted-foreground">
                Check{" "}
                <Link
                  href="https://motion.dev/docs/react-use-in-view"
                  target="_blank"
                  className="underline underline-offset-2 dark:hover:text-white hover:text-black "
                >
                  motion
                </Link>{" "}
                animation library for more.
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">isAnimationStopped?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="boolean" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>false</code>
            </TableCell>
            <TableCell>
              Freezes animation at current state. Overrides all other animation
              properties when true.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">className?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Additional CSS classes for styling the container element. Merges
              with internal styles.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">children?</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="React.ReactNode" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Content to animate. Can be any valid React children including
              components and raw elements.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>
);

const PerformanceCards: FC = () => {
  const data = [
    {
      icon: <Zap className="w-5 h-5  text-violet-500" />,
      title: "Hardware Acceleration",
      desc: (
        <div className="text-sm text-muted-foreground">
          Use transform-based animations like <code>translate3d</code> and{" "}
          <code>scale</code> for smoother performance.
        </div>
      ),
    },
    {
      icon: <Cog className="w-5 h-5 animate-spin dark:text-white text-black" />,
      title: "Complexity Management",
      desc: (
        <div className="text-sm text-muted-foreground">
          Limit simultaneous animations to 3-4 properties per element.
        </div>
      ),
    },
    {
      icon: <BookOpen className="w-5 h-5  text-red-500" />,
      title: "Learn CAS",
      desc: (
        <div className="text-sm text-muted-foreground">
          If you would like to learn how to control your animations like
          <CodeBadge children="reverse" /> <CodeBadge children="stop" />{" "}
          <CodeBadge children="control" />
          efficiently using react hooks,{" "}
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
      icon: <BadgeInfo className="w-6 h-6  text-blue-500" />,
      title: "Reduce render count",
      desc: (
        <div className="text-sm text-muted-foreground">
          When you using a controlled motion provider such as{" "}
          <CodeBadge children="<MotionContainer />" />{" "}
          <CodeBadge children="<MotionQueue />" /> in a same component, use
          <CodeBadge children="useMemo" /> to optimize performance.
        </div>
      ),
    },
  ] as PerformanceCardDataProps[];

  const rightFadeInMode = ["filterBlurIn", "fadeDown"];
  const leftFadeInMode = ["filterBlurIn", "fadeUp"];

  const animations = Array.from({ length: data.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "smooth",
  })) as AnimationQueueAnimationProps[];

  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">Performance Tips</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <MotionQueue
          isDynamicallyQueued
          elementType="div"
          animations={animations}
          children={data.map((item, idx) => (
            <Fragment key={idx}>
              <h4 className="font-semibold mb-2 items-center flex gap-2 ">
                {item.icon} <span>{item.title}</span>
              </h4>
              {item.desc}
            </Fragment>
          ))}
          className="p-4 border rounded-lg"
        />
      </div>
    </section>
  );
};
