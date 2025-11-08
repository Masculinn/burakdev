import MotionChain from "@/motion/motion-chain";
import type {
  MotionAnimationProps,
  MotionChainConfigProps,
} from "@/motion/types";
import type {
  LineInputProps,
  LineOutputProps,
  Token,
  TokenInputProps,
  TokenOutputProps,
} from "prism-react-renderer";
import { memo, useMemo } from "react";

type TokenLinesProps = {
  tokens: Token[][];
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  isInView: boolean;
  shouldAnimate: boolean;
};

const ANIMATION_CONFIG = {
  duration: 0.15,
  delayLogic: "linear",
} as const as MotionChainConfigProps;

function HighlightCodeSnippet({
  tokens,
  getLineProps,
  getTokenProps,
  isInView,
  shouldAnimate,
}: TokenLinesProps) {
  const tokenCount = tokens.length;

  const animations = useMemo(
    () =>
      Array.from({ length: tokenCount }).map(
        () =>
          ({
            mode: ["fadeIn", "filterBlurIn"],
            transition: "gentle",
            duration: 1,
          }) as MotionAnimationProps,
      ),
    [tokenCount],
  );

  if (shouldAnimate) {
    return (
      <MotionChain
        animations={animations}
        elementType="div"
        controller={{ trigger: isInView }}
        config={ANIMATION_CONFIG}
      >
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })} className="flex">
            <span className="mr-6 dark:text-muted text-muted-foreground font-secondary">
              {i + 1}
            </span>
            {line.map((v, idx) => (
              <span key={idx} {...getTokenProps({ token: v })} />
            ))}
          </div>
        ))}
      </MotionChain>
    );
  }

  return tokens.map((line, i) => (
    <div key={i} {...getLineProps({ line })} className="flex">
      <span className="mr-6 dark:text-muted text-muted-foreground">
        {i + 1}
      </span>
      {line.map((v, idx) => (
        <span key={idx} {...getTokenProps({ token: v })} />
      ))}
    </div>
  ));
}

export default memo(HighlightCodeSnippet);
