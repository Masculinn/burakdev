import { ChartRenderer, type ChartPayload } from "@/components/chart-renderer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useElementSize } from "@/hooks/use-element-size";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import type { HTMLAttributes } from "@/interfaces";
import { useInView } from "motion/react";
import dynamic from "next/dynamic";
import { Children, isValidElement, memo, Suspense, type FC } from "react";
import { CopyCode } from "../copy-code";
import HighlightCodeSnippet from "../highlight-code-snippet";

type MdPreProps = HTMLAttributes<HTMLPreElement>;

const MAX_HEIGHT = 560;
const ANIMATION_TRIGGER_THRESHOLD = 900;
const LANG_RE = /language-(\w+)/;

function getLanguage(child: unknown): string | "text" {
  if (!child) return "text";

  const className: string | undefined = (
    child as { props: { className?: string } }
  ).props?.className;

  const m = className?.match(LANG_RE);

  let lang = m?.[1] ?? "text";

  // add support later
  if (lang === "ts" || lang === "typescript") lang = "tsx";
  if (lang === "js" || lang === "javascript") lang = "tsx";
  if (lang === "bash" || lang === "sh") lang = "tsx";

  return lang;
}

const MdPreComponent: FC<MdPreProps> = memo(({ lang, ...props }) => {
  const { ref: preRef, size } = useElementSize<HTMLPreElement>();
  const isInView = useInView(preRef, { once: false });

  const isReducedMotion = usePrefersReducedMotion();

  const child = getChild(props.children);
  const code = ensureChildExist(child);

  const language = getLanguage(child);

  if (language === "chart") {
    return (
      <ChartRenderer
        chart={JSON.parse(code) as ChartPayload}
        isAnimationActive={!isReducedMotion}
      />
    );
  }

  const measuredHeight = size.height || 0;

  const wrapperHeight =
    measuredHeight > 0 ? Math.min(measuredHeight, MAX_HEIGHT) : undefined;

  const shouldAnimate =
    code.length <= ANIMATION_TRIGGER_THRESHOLD && !isReducedMotion;

  return (
    <div className="w-full my-4 flex justify-center relative overflow-y-hidden">
      <CopyCode
        data={code}
        variant="ghost"
        className="absolute z-20 top-4 right-4 text-muted"
      />
      <ScrollArea
        className="rounded-xl border shadow-xl relative w-full"
        style={{
          height: wrapperHeight ? `${wrapperHeight}px` : "auto",
          maxWidth: "100%",
          maxHeight: `${MAX_HEIGHT}px`,
          backgroundColor: "oklch(0.141 0.005 285.823)",
        }}
      >
        <pre
          ref={preRef}
          className="font-secondary md:px-8 -mt-1 p-6 text-sm whitespace-pre"
        >
          <Suspense
            defer
            name="highlight-suspense"
            fallback={<Skeleton className="size-full" />}
          >
            <HighlightCodeSnippet
              code={code}
              isInView={isInView}
              shouldAnimate={shouldAnimate}
            />
          </Suspense>
        </pre>
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});

function ensureChildExist(child: React.ReactNode | undefined) {
  if (!child) return "";
  const c = (child as { props: { children?: unknown } }).props?.children;
  if (typeof c === "string") return c.replace(/\n$/, "");
  if (Array.isArray(c)) return c.join("");
  return String(c ?? "");
}

function getChild(children: React.ReactNode) {
  return Children.toArray(children).find((c) => isValidElement(c));
}

const MdPre = dynamic(() => Promise.resolve({ default: MdPreComponent }), {
  ssr: false,
  loading: () => <Skeleton className="size-full" />,
});

export default MdPre;
