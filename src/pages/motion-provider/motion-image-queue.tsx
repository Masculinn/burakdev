import Head from "next/head";
import CodeProvider from "@/components/Documentation/code-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { CodeBadge } from "@/components/Documentation/code-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, Fragment } from "react";
import {
  BadgeInfo,
  Ban,
  CheckCheck,
  Cog,
  Sparkles,
  BookOpen,
  Info,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import documentationLib from "@/lib/documentation.lib";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";

export default function MotionImageQueue() {
  const theme = useSelector((state: { theme: any }) => state.theme);
  const isMobile = useIsMobile();
  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Image Queue</title>
        <meta
          name="description"
          content="Motion Image Queue documentation powered by Motion Provider"
        />
        <meta property="og:title" content="Motion Provider - Image Queue" />
        <meta
          property="og:description"
          content="Motion Image Queue documentation powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/motion-image-queue"
        />
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="lg:text-3xl text-xl font-bold mb-4">
            <pre>{"<MotionImageQueue />"}</pre>
          </h2>
          <p className="mb-4 text-muted-foreground tracking-tight">
            The <code>MotionImageQueue</code> component provides a dynamic image
            queuing system with built-in animations. It automatically
            transitions between images using predefined enter and exit
            animations and supports custom configurations for delays,
            transitions, and piecewise animations.
          </p>
          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-amber-300" />{" "}
              <span className="lg:text-lg text-base font-bold">
                Key Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>
                  Seamless image transitions using customizable enter and exit
                  animations.
                </li>
                <li>
                  Automatic cycling through images when{" "}
                  <code>isDynamicallyQueued</code> is enabled.
                </li>
                <li>
                  Customizable animation timings, delay logic, and piecewise
                  effects.
                </li>
                <li>
                  Optimized rendering through memoization and dynamic imports.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Basic Usage */}
        <section className="mb-12">
          <h3 className="text-xl lg:text-2xl font-bold mb-4">Basic Usage</h3>
          <CodeProvider
            showLineNumbers
            code={documentationLib.motionImageQueue.code}
            appTheme={theme}
            bordered
            rounded
            fontSize={fontSize}
            lang="typescript"
          />
        </section>

        {/* Component Props */}
        <PropsTable />

        {/* Best Practices */}
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
                  <li>
                    Provide an adequate array of image URLs to ensure smooth
                    transitions.
                  </li>
                  <li>
                    Use complementary <code>enterAnimation</code> and{" "}
                    <code>exitAnimation</code> presets that match your design.
                  </li>
                  <li>
                    Configure <code>animationDuration</code> and{" "}
                    <code>totalDelay</code> to achieve a natural flow.
                  </li>
                  <li>
                    Optimize image sizes and lazy load images for better
                    performance.
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
                <ul className="list-disc pl-6">
                  <li>
                    Avoid overcrowding the component with too many images at
                    once.
                  </li>
                  <li>
                    Don’t mix conflicting animations (e.g. combining rapid{" "}
                    <code>fadeIn</code> with abrupt <code>fadeOut</code>{" "}
                    effects).
                  </li>
                  <li>
                    Do not omit fallback content—always provide a fallback for
                    empty image arrays.
                  </li>
                  <li>
                    Avoid excessive delays that can hamper the responsiveness of
                    your UI.
                  </li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Performance Tips */}
        <PerformanceTips />
      </div>
    </>
  );
}

const PropsTable: FC = () => (
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
            <TableCell className="font-medium">images</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string[]" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>[]</code>
            </TableCell>
            <TableCell>
              An array of image URLs to display in the queue. When empty, the{" "}
              <code>fallback</code> content is rendered.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">controlConfig</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="object" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Configuration object to control the animation behavior. This is
              passed directly to the underlying motion element.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">enterAnimation</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="AnimationKeys | AnimationKeys[]" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Animation preset(s) applied when an image enters the view.
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>["fadeIn", "scaleZoomIn"]</code>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">exitAnimation</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="AnimationKeys | AnimationKeys[]" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Animation preset(s) applied when an image exits the view.
              <div className="mt-1 text-xs text-muted-foreground">
                Example: <code>["fadeOut"]</code>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">wrapperClassName</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>"relative"</code>
            </TableCell>
            <TableCell>
              Additional CSS classes for the outer wrapper element.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">animationDuration</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="number" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>2</code>
            </TableCell>
            <TableCell>
              Duration (in seconds) for the complete animation cycle.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">configView</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="object" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>{`{ once: false, amount: 0.5 }`}</code>
            </TableCell>
            <TableCell>
              Intersection Observer configuration for triggering animations.
              Adjusts when the animations are activated in the viewport.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">customDelayLogic</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="Function" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Custom function to calculate staggered delays for individual
              animation pieces.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">delayLogic</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>"sinusoidal"</code>
            </TableCell>
            <TableCell>
              Predefined delay logic strategy for staggered animations.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">pieces</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="number" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>121</code>
            </TableCell>
            <TableCell>
              Number of pieces into which the image is split to create piecewise
              animation effects.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">elementClassname</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Additional CSS classes for the animated element.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">fallback</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="React.ReactNode" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>{`<div className="w-full h-full absolute bg-stone-950 animate-pulse" />`}</code>
            </TableCell>
            <TableCell>
              Fallback content rendered when the <code>images</code> array is
              empty.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">isDynamicallyQueued</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="boolean" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Enables automatic cycling through the images when set to{" "}
              <code>true</code>.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">motionFn</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="Function" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>undefined</code>
            </TableCell>
            <TableCell>
              Custom motion function for additional animation control.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">totalDelay</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="number" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>0</code>
            </TableCell>
            <TableCell>
              Total delay (in seconds) applied before the animation starts.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">transition</TableCell>
            <TableCell className="text-muted-foreground">
              <CodeBadge code="string" />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <code>"smooth"</code>
            </TableCell>
            <TableCell>
              Predefined transition timing function for the animation.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>
);

const PerformanceTips: FC = () => {
  const data = [
    {
      icon: <Info className="w-5 h-5 text-violet-500" />,
      title: "Optimized Rendering",
      desc: (
        <div className="text-sm text-muted-foreground">
          All the Motion Provider components already being exported by using{" "}
          <CodeBadge code="next/dynamic" />. So mind that your images will be
          rendered only when needed on client-side.
        </div>
      ),
    },
    {
      icon: <Cog className="w-5 h-5 animate-spin text-black dark:text-white" />,
      title: "Customizable Timings",
      desc: (
        <div className="text-sm text-muted-foreground">
          Adjust <CodeBadge code="animationDuration" /> and{" "}
          <CodeBadge code="totalDelay" /> for a balanced animation flow.
        </div>
      ),
    },
    {
      icon: <BookOpen className="w-5 h-5 text-red-500" />,
      title: "Flexible Configurations",
      desc: (
        <div className="text-sm text-muted-foreground">
          Fine-tune <CodeBadge code="controlConfig" /> and{" "}
          <CodeBadge code="configView" /> to meet different use cases.
        </div>
      ),
    },
    {
      icon: <BadgeInfo className="w-6 h-6 text-blue-500" />,
      title: "Performance Monitoring",
      desc: (
        <div className="text-sm text-muted-foreground">
          Regularly review your animation performance to ensure a smooth user
          experience.
        </div>
      ),
    },
  ];

  const rightFadeInMode = ["filterBlurIn", "fadeDown"];
  const leftFadeInMode = ["filterBlurIn", "fadeUp"];

  const animations = Array.from({ length: data.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "smooth",
  }));

  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">Performance Tips</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <MotionQueue
          isDynamicallyQueued
          elementType="div"
          animations={animations as AnimationQueueAnimationProps[]}
          className="p-4 border rounded-lg"
        >
          {data.map((item, idx) => (
            <Fragment key={idx}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {item.icon} <span>{item.title}</span>
              </h4>
              {item.desc}
            </Fragment>
          ))}
        </MotionQueue>
      </div>
    </section>
  );
};
