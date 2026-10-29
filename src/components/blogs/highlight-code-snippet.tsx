import { getHighlighter } from "@/lib/shiki";
import { MotionChain } from "@/motion/components/motion-chain";
import type { MotionChainConfigProps } from "@/motion/types";
import type { ThemedToken } from "@shikijs/core";
import { type CSSProperties, use } from "react";

interface Props {
  isInView: boolean;
  shouldAnimate: boolean;
  code: string;
}

const ANIMATION_CONFIG = {
  duration: 0.15,
  delayLogic: "linear",
} as const as MotionChainConfigProps;

const INITIAL_FONT_OPTIONS = {
  italic: 1,
  bold: 2,
  underline: 4,
} as const;

function getTokenStyle(
  { color, fontStyle }: Pick<ThemedToken, "color" | "fontStyle">,
  fontOptions: typeof INITIAL_FONT_OPTIONS = INITIAL_FONT_OPTIONS,
): CSSProperties {
  const style: CSSProperties = {};

  if (color) style.color = color;

  if (fontStyle !== undefined && fontStyle > 0) {
    if ((fontStyle & fontOptions.italic) !== 0) style.fontStyle = "italic";
    if ((fontStyle & fontOptions.bold) !== 0) style.fontWeight = 700;
    if ((fontStyle & fontOptions.underline) !== 0)
      style.textDecoration = "underline";
  }

  return style;
}

const highlighterPromise = getHighlighter();

function HighlightCodeSnippet({ isInView, shouldAnimate, code }: Props) {
  const highlighter = use(highlighterPromise);
  if (!highlighter) return null;

  const { tokens } = highlighter.codeToTokens(code, {
    lang: "tsx",
    theme: "syntax-theme",
  });

  const lineIndexWidth = `${String(tokens.length).length}ch`;

  if (shouldAnimate) {
    return (
      <MotionChain
        animations={tokens.map(() => ({
          mode: ["fadeIn", "filterBlurIn"],
          transition: "gentle",
          duration: 1,
        }))}
        elementType="div"
        controller={{ trigger: isInView }}
        config={ANIMATION_CONFIG}
      >
        {tokens.map((line, lineIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static data
          <div key={lineIndex} className="flex">
            <span
              className="mr-6 dark:text-muted text-muted-foreground font-secondary"
              style={{ width: lineIndexWidth }}
              aria-hidden="true"
            >
              {lineIndex + 1}
            </span>
            {line.map((token) => (
              <span key={token.offset} style={getTokenStyle(token)}>
                {token.content}
              </span>
            ))}
          </div>
        ))}
      </MotionChain>
    );
  }

  return tokens.map((line, lineIndex) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static data
    <div key={lineIndex} className="flex">
      <span
        className="mr-6 dark:text-muted text-muted-foreground font-secondary"
        style={{ width: lineIndexWidth }}
        aria-hidden="true"
      >
        {lineIndex + 1}
      </span>
      {line.map((token) => (
        <span key={token.offset} style={getTokenStyle(token)}>
          {token.content}
        </span>
      ))}
    </div>
  ));
}

export default HighlightCodeSnippet;
