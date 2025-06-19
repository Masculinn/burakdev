import Head from "next/head";
import CodeProvider from "@/components/Documentation/code-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { ReduxThemeProps, StepCardDataProps } from "@/interfaces";
import { useIsMobile } from "@/hooks/use-mobile";
import documentationLib from "@/lib/documentation.lib";
import { FC, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Ban,
  BookOpen,
  CheckCheck,
  Cpu,
  Hand,
  RefreshCw,
  Sparkles,
  Square,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { CodeBadge } from "@/components/Documentation/code-badge";
import { StepCards } from "@/components/Documentation/step-cards";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";

const stepCardsData = [
  {
    title: "Image fallback",
    desc: "First of all, to avoid unexpected errors that breaks the algorithm, MotionProvider provides an image fallback mechanism till the actual image is loaded on client-side. If the URL broken, component will return nothing.",
  },
  {
    title: "Grid Algorithm Calculation",
    desc: (
      <div className="text-sm text-muted-foreground mt-2">
        <CodeBadge code="<MotionImage />" /> component gets the props then
        creates columns and rows based on <CodeBadge code="pieces" />. This
        process works under of <CodeBadge code="useMemo()" /> hook which makes
        the functionality more flex. <br />
        <br />
        <span className="font-bold dark:text-white text-black">Note:</span> If
        you would like to change the pieces using any react hook that triggers
        re-render, the calculation process will repeat itself accordingly.
      </div>
    ),
  },
  {
    title: "Prop Drilling Mechanism",
    desc: (
      <div className="text-sm text-muted-foreground mt-2">
        <CodeBadge code="<MotionImage />" /> component uses{" "}
        <CodeBadge code="<MotionQueue />" /> component as a child component to
        manage iterative animations then <CodeBadge code="<MotionQueue />" />{" "}
        passes the props to the <CodeBadge code="<MotionContainer />" />{" "}
        component in a declarative way enables you to control/render your
        animations.
      </div>
    ),
  },
] as StepCardDataProps[];

export default function MotionImage() {
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();
  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Image Motion</title>
        <meta
          name="description"
          content="Motion Image documentation powered by Motion Provider"
        />
        <meta property="og:title" content="Motion Provider - Image Motion" />
        <meta
          property="og:description"
          content="Motion Image documentation powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/motion-image"
        />
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className="mb-12">
          <h2 className="lg:text-3xl text-xl font-bold mb-4">
            <pre>{"<MotionImage />"}</pre>
          </h2>
          <p className="mb-4 tracking-tight">
            My dear developer, after 60+ hours of working on engine development
            {"(mostly focused on performance optimization)"}, here you have rich
            and detailed image motion documentation. Read it carefully to avoid
            performance leaks,{" "}
            <Link
              href={"/motion-provider/motion-image-engine"}
              className="underline underline-offset-2 dark:hover:text-stone-300 hover:text-stone-600 "
            >
              go to the motion image engine page
            </Link>
            , configure your animations in couple of clicks, test and use it in
            your own project!
          </p>
          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-300" />{" "}
              <span className="lg:text-lg text-base font-bold">
                Core Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>Fully customizable animation configuration</li>
                <li>Dynamic image fragmentation (1-900+ pieces)</li>
                <li>Interactive hover/click animations</li>
                <li>15+ Recursive animation pattern algorithms</li>
                <li>Custom delay timing functions</li>
                <li>Centralized Animation System (CAS) integration support</li>
                <li>21,840 built-in animation combination variations</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>
        <section className="mb-12">
          <h3 className="text-xl lg:text-2xl font-bold mb-4">
            Basic Implementation
          </h3>
          <CodeProvider
            code={documentationLib.imageMotionBasic.code}
            appTheme={theme}
            bordered
            rounded
            fontSize={fontSize}
            lang="typescript"
          />
          <div className="mt-4 text-base text-muted-foreground tracking-tighter">
            In this example, we use a basic image motion implementation. So how
            workflow works in the background?
          </div>
          <StepCards data={stepCardsData} />
        </section>
        <PropsTable />
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">
            Optimal Grid Configurations
          </h3>
          <Alert className="mb-6">
            <AlertTitle className="flex items-center gap-2">
              <Square className="w-5 h-5 text-blue-500" />
              <span className="font-bold">Perfect Square Layouts</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Pieces</TableHead>
                    <TableHead>Grid</TableHead>
                    <TableHead>Math</TableHead>
                    <TableHead>Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    [36, "6×6", "6² = 36", "Small icons/thumbnails"],
                    [64, "8×8", "8² = 64", "Medium animations"],
                    [144, "12×12", "12² = 144", "HD displays"],
                    [256, "16×16", "16² = 256", "4K/UHD content"],
                    [400, "20×20", "20² = 400", "Large format"],
                  ].map(([pieces, grid, math, useCase], index) => (
                    <TableRow key={index}>
                      <TableCell>{pieces}</TableCell>
                      <TableCell>{grid}</TableCell>
                      <TableCell>
                        <code>{math}</code>
                      </TableCell>
                      <TableCell>{useCase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>

          <Alert className="mb-6">
            <AlertTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-green-500" />
              <span className="font-bold">Aspect Ratio Layouts</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Aspect</TableHead>
                    <TableHead>Pieces</TableHead>
                    <TableHead>Grid</TableHead>
                    <TableHead>Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["16:9 (HD)", 576, "24×24", "Full-screen animations"],
                    ["4:3 (Legacy)", 192, "16×12", "Retro designs"],
                    [
                      "1:1 (Square)",
                      "Any perfect square",
                      "-",
                      "Icons/profile",
                    ],
                  ].map(([aspect, pieces, grid, useCase], index) => (
                    <TableRow key={index}>
                      <TableCell>{aspect}</TableCell>
                      <TableCell>{pieces}</TableCell>
                      <TableCell>{grid}</TableCell>
                      <TableCell>{useCase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>

          <Alert className="mb-6">
            <AlertTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-purple-500" />
              <span className="font-bold">Flexible Grid Numbers</span>
            </AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Pieces</TableHead>
                    <TableHead>Grids</TableHead>
                    <TableHead>Divisors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    [72, "8×9, 6×12, 9×8", "1, 2, 3, 4, 6, 8, 9..."],
                    [120, "10×12, 8×15, 6×20", "1, 2, 3, 4, 5, 6..."],
                    [240, "12×20, 15×16, 10×24", "1, 2, 3, 4, 5..."],
                  ].map(([pieces, grids, divisors], index) => (
                    <TableRow key={index}>
                      <TableCell>{pieces}</TableCell>
                      <TableCell>{grids}</TableCell>
                      <TableCell>
                        <code>{divisors}</code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-bold">Calculation Formula</span>
            </AlertTitle>
            <AlertDescription>
              <CodeProvider
                code={`const calculateOptimalPieces = (width, height, density) => {
  const base = Math.sqrt(width * height);
  return Math.pow(Math.round(base * (0.2 * density)), 2);
};`}
                appTheme={theme}
                bordered
                rounded
                fontSize={fontSize}
                lang="typescript"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                Example: 1920x1080 screen with density 3 → ≈144 pieces
              </div>
            </AlertDescription>
          </Alert>
        </section>
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4">Usage Guidelines</h3>
          <div className="space-y-4">
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <CheckCheck className="w-5 h-5 text-green-500" />{" "}
                <span className="font-bold text-lg">Optimal Practices</span>
              </AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-6">
                  <li>
                    Use 100-400 pieces for balance between smoothness and
                    performance
                  </li>
                  <li>
                    Combine with transforms such as{" "}
                    <CodeBadge code="translate3dIn, translate3dBounce" /> for 3D
                    effects
                  </li>
                  <li>
                    Use PNG images with transparent backgrounds for best results
                    {"-you will shock!-"}.
                  </li>
                  <li>
                    Use great fallback elements, e.g. Shadcn{" "}
                    <CodeBadge code="<Skeleton />" />
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-red-500" />{" "}
                <span className="font-bold text-lg">Avoid</span>
              </AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-6">
                  <li>Images larger than 2000px in either dimension</li>
                  <li>More than 1000 pieces without performance testing</li>
                  <li>Simultaneous recursive and interactive animations</li>
                  <li>
                    Long animation durations {"(>3s)"} for interactive elements
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>
        <PerformanceSection />
      </div>
    </>
  );
}

const PropsTable: FC = () => {
  return (
    <section className="mb-12">
      <h3 className="text-xl lg:text-2xl font-bold mb-4">Component Props</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px]">Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">imageUrl</TableCell>
              <TableCell>
                <CodeBadge code="string" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Source URL for the image to animate. Supports all browser image
                formats.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">pieces</TableCell>
              <TableCell>
                <CodeBadge code="number" />
              </TableCell>
              <TableCell>
                <code>240</code>
              </TableCell>
              <TableCell>
                Number of image fragment pieces. Automatically arranges in grid
                pattern.
                <div className="mt-1 text-xs text-muted-foreground">
                  Optimal range: 100-400 pieces.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">animations</TableCell>
              <TableCell>
                <CodeBadge code="AnimationKeys | AnimationKeys[]" />
              </TableCell>
              <TableCell>
                <code>{"['fadeIn']"}</code>
              </TableCell>
              <TableCell>
                Animation presets to apply to each image fragment. Supports all
                MotionProvider animations.
                <div className="mt-1 text-xs text-muted-foreground">
                  Avoid overlapping animations and more than 3 simultaneous.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">motionFn?</TableCell>
              <TableCell>
                <CodeBadge code="'hover' | 'click'" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Interaction type for triggering piece animations.
                <div className="mt-1 text-xs text-destructive">
                  If you use over 300+ pieces do not use <code>hover</code>{" "}
                  function to stay stabilized by 60 FPS.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">delayLogic?</TableCell>
              <TableCell>
                <CodeBadge code="DelayLogic" />
              </TableCell>
              <TableCell>
                <code>sinusoidal</code>
              </TableCell>
              <TableCell>
                Timing function for staggered animations. Choose from 15+ preset
                pattern algorithms.
                <div className="mt-1 text-xs text-muted-foreground">
                  Check{" "}
                  <Link
                    href="/motion-provider/motion-image-engine"
                    className="underline dark:hover:text-white hover:text-black"
                  >
                    Motion Image Engine
                  </Link>{" "}
                  for more.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">controlConfig?</TableCell>
              <TableCell>
                <CodeBadge code="ImageMotionCASProps" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Centralized Animation System configuration object for advanced
                control.
                <div className="mt-1 text-xs text-muted-foreground">
                  Check{" "}
                  <Link
                    href="/motion-provider/centralized-animation-system"
                    className="underline dark:hover:text-white hover:text-black"
                  >
                    Centralized Animation System
                  </Link>{" "}
                  page to learn controlling your animations efficiently.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">fallback?</TableCell>
              <TableCell>
                <CodeBadge code="React.ReactNode" />
              </TableCell>
              <TableCell>
                <code>{" <div /> "}</code>
              </TableCell>
              <TableCell>
                A fallback component to display while the image is loading.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">animationDuration</TableCell>
              <TableCell>
                <CodeBadge code="number" />
              </TableCell>
              <TableCell>
                <code>3</code>
              </TableCell>
              <TableCell>
                Animation duration in seconds mounted on each pieces.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">elementClassname?</TableCell>
              <TableCell>
                <CodeBadge code="className" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Represents the <CodeBadge code="<MotionQueue />" /> styling.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">wrapperClassName?</TableCell>
              <TableCell>
                <CodeBadge code="className" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Represents the wrapper <CodeBadge code="<div />" /> styling.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                isDynamicallyQueued?
              </TableCell>
              <TableCell>
                <CodeBadge code="boolean" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Set to <code>true</code> to dynamically queue animations.
                <div className="mt-1 text-xs text-destructive">
                  If you are using <code>totalDelay</code> to control the delay,
                  it <b>will not</b> work with this, set to <code>false</code>{" "}
                  to control your animation delay.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">totalDelay?</TableCell>
              <TableCell>
                <CodeBadge code="number" />
              </TableCell>
              <TableCell>
                <code>0</code>
              </TableCell>
              <TableCell>
                Set to <code>true</code> to control animation delay of each
                pieces.
                <div className="mt-1 text-xs text-destructive">
                  If you are using <code>isDynamicallyQueued</code> to control
                  the delay automatically, it <b>will not</b> work with this,
                  set a <code>number</code> to control your animation delay.
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">configView?</TableCell>
              <TableCell>
                <CodeBadge code="UseInViewOptions" />
              </TableCell>
              <TableCell>
                <code>{"{ once: true, amount: 'some' }"}</code>
              </TableCell>
              <TableCell>
                Check{" "}
                <Link
                  href="https://motion.dev/docs/react-use-in-view"
                  className="underline underline-offset-2"
                  target="_blank"
                >
                  motion
                </Link>{" "}
                for more.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">customDelayLogic?</TableCell>
              <TableCell>
                <CodeBadge code="(index: number) => number" />
              </TableCell>
              <TableCell>
                <code>undefined</code>
              </TableCell>
              <TableCell>
                Check{" "}
                <Link
                  href="https://motion.dev/docs/react-use-in-view"
                  target="_blank"
                  className="underline underline-offset-2"
                >
                  motion
                </Link>{" "}
                for more.
                <div className="mt-1 text-xs text-destructive">
                  If you are using <code>isDynamicallyQueued</code> to control
                  the delay automatically, it <b>will not</b> work with this.
                  Set the <code>isDynamicallyQueued</code> props as{" "}
                  <code>false</code> or <code>undefined</code>, to control your
                  animation delay logic.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

const PerformanceSection: FC = () => {
  const data = [
    {
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      title: "GPU Acceleration",
      desc: "Enable with will-change: transform on image pieces",
    },
    {
      icon: <Timer className="w-5 h-5 text-green-500" />,
      title: "Timing Optimization",
      desc: "Keep animation durations below 1.5s for interactive elements",
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
      icon: <Hand className="w-5 h-5 text-orange-500" />,
      title: "Interaction Limits",
      desc: "Debounce hover/click events by at least 150ms",
    },
  ];
  const rightFadeInMode = ["fadeRight", "scaleZoomIn", "filterBlurIn"];
  const leftFadeInMode = ["fadeLeft", "scaleZoomIn", "filterBlurIn"];

  const animations = Array.from({ length: data.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "smooth",
  })) as AnimationQueueAnimationProps[];

  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">Performance Optimization</h3>
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
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </Fragment>
          ))}
          className="p-4 border rounded-lg"
        />
      </div>
    </section>
  );
};
