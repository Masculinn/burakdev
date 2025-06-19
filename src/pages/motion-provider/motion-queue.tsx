import CodeProvider from "@/components/Documentation/code-provider";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";
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
import { ReduxThemeProps } from "@/interfaces";
import documentationLib from "@/lib/documentation.lib";
import {
  Ban,
  CheckCheck,
  Clock,
  ListTree,
  MoveRight,
  Sigma,
  TimerReset,
} from "lucide-react";
import Head from "next/head";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { CodeBadge } from "@/components/Documentation/code-badge";

export default function MotionQueuePage() {
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();
  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Motion Queue</title>
        <meta
          name="description"
          content="Motion Queue documentation powered by Motion Provider"
        />
        <meta property="og:title" content="Motion Provider - Motion Queue" />
        <meta
          property="og:description"
          content="Motion Queue documentation powered by Motion Provider"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/motion-queue"
        />
      </Head>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <section className="mb-12">
          <h2 className="lg:text-3xl text-xl font-bold mb-4">
            <pre>{"<MotionQueue />"}</pre>
          </h2>
          <p className="mb-4 text-muted-foreground tracking-tight">
            Advanced animation sequencer for coordinating complex animation
            timelines across multiple elements.
          </p>

          <Alert className="mb-8">
            <AlertTitle className="flex items-center gap-2">
              <ListTree className="h-6 w-6 text-green-500" />
              <span className="lg:text-lg text-base font-bold">
                Key Features
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <ul className="list-disc pl-6">
                <li>Sequenced animation timelines</li>
                <li>
                  16 predefined delay calculation algorithms{" "}
                  {"(linear/exponential/custom/sinusoidal/quantum/etc.)"}
                </li>
                <li>Dynamic queue regeneration</li>
                <li>Type-safe animation coordination</li>
                <li>Automatic child-animation matching</li>
                <li>Nested animation support</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        <section className="mb-12">
          <h3 className="text-xl lg:text-2xl font-bold mb-4">Basic Usage</h3>
          <CodeProvider
            code={documentationLib?.simpleMotionQueueExample.code}
            appTheme={theme}
            bordered
            rounded
            fontSize={fontSize}
            lang="typescript"
          />
          <div className="space-y-4 mt-8">
            <h2 className="font-bold text-xl lg:text-2xl">Delay Logic Types</h2>
            <CodeProvider
              code={documentationLib.delayLogicExample.code}
              appTheme={theme}
              bordered
              rounded
              fontSize={fontSize}
              lang="typescript"
            />
            <p className="text-sm text-muted-foreground">
              Custom delay functions receive the element index and base duration
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
                  <li>Match animation and children array lengths</li>
                  <li>Use dynamic queuing for variable-length content</li>
                  <li>
                    Combine with <CodeBadge code="<MotionContainer />" />
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
                  <li>Don't use with infinite animations</li>
                  <li>Avoid mixing controlled/uncontrolled children</li>
                  <li>Don't overload with 50+ simultaneous animations</li>
                  <li>Avoid complex custom logic in render</li>
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
            <TableCell className="font-medium">animations</TableCell>
            <TableCell>
              <CodeBadge>AnimationQueueAnimationProps[]</CodeBadge>
            </TableCell>
            <TableCell>required</TableCell>
            <TableCell>Array of animation configs for each child</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">children</TableCell>
            <TableCell>
              <CodeBadge>React.ReactNode[]</CodeBadge>
            </TableCell>
            <TableCell>required</TableCell>
            <TableCell>Array of elements to animate</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">delayLogic</TableCell>
            <TableCell>
              <CodeBadge>
                'linear' | 'exponential' | 'sinusoidal' | 'custom'
              </CodeBadge>
            </TableCell>
            <TableCell>'linear'</TableCell>
            <TableCell>Algorithm for calculating staggered delays</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">duration</TableCell>
            <TableCell>
              <CodeBadge>number</CodeBadge>
            </TableCell>
            <TableCell>0.5</TableCell>
            <TableCell>
              Base duration for delay calculations (seconds)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">isDynamicallyQueued</TableCell>
            <TableCell>
              <CodeBadge>boolean</CodeBadge>
            </TableCell>
            <TableCell>false</TableCell>
            <TableCell>Enable dynamic delay calculation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">delayByElement</TableCell>
            <TableCell>
              <CodeBadge>number</CodeBadge>
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>Fixed delay per element (overrides logic)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">customLogic</TableCell>
            <TableCell>
              <CodeBadge>(index: number) {"=>"} number</CodeBadge>
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>Custom delay calculation function</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>
);

const PerformanceCards: FC = () => {
  const data = [
    {
      icon: <Sigma className="w-5 h-5 text-purple-500" />,
      title: "Delay Logic Choices",
      desc: (
        <div className="text-sm text-muted-foreground">
          Use <CodeBadge code="linear" /> for even spacing,{" "}
          <CodeBadge code="exponential" /> for accelerating effects
        </div>
      ),
    },
    {
      icon: <TimerReset className="w-5 h-5 text-blue-500" />,
      title: "Dynamic Queuing",
      desc: (
        <div className="text-sm text-muted-foreground">
          Enable <CodeBadge code="isDynamicallyQueued" /> for content with
          variable lengths
        </div>
      ),
    },
    {
      icon: <MoveRight className="w-5 h-5 text-green-500" />,
      title: "Sequence Patterns",
      desc: (
        <div className="text-sm text-muted-foreground">
          Combine with <CodeBadge code="staggeredIn" /> animations for cascading
          effects
        </div>
      ),
    },
    {
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      title: "Performance",
      desc: (
        <div className="text-sm text-muted-foreground">
          Memoize children components to prevent unnecessary re-renders
        </div>
      ),
    },
  ];
  const rightFadeInMode = ["scaleZoomIn", "filterBlurIn", "fadeDown"];
  const leftFadeInMode = ["scaleZoomIn", "filterBlurIn", "fadeUp"];

  const animations = Array.from({ length: data.length }).map((_, index) => ({
    mode: index % 2 === 0 ? rightFadeInMode : leftFadeInMode,
    duration: 1,
    configView: { once: false, amount: 0.5 },
    transition: "delayedElastic",
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
              <h4
                className="font-semibold mb-2 items-center flex gap-2 "
                key={idx}
              >
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
