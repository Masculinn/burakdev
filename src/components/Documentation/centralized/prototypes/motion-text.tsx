import { cn } from "@/lib/utils";
import React, { FC, Suspense } from "react";
import {
  AnimationKeys,
  MotionTextProps,
  ViewAnimationControllerProps,
} from "@/components/MotionProvider/types";
import text from "@/lib/motion-text.lib";
import { providerStyle } from "@/pages/motion-provider/overview";
import MotionContainer from "@/components/MotionProvider/motion-container";

const MotionText: FC<ViewAnimationControllerProps & MotionTextProps> = (
  props
) => {
  const { children, stopAnimating, reverse } = props;

  const isLazyComponent = React.isValidElement(children);

  const renderPlainText = () => (
    <p className={cn("tracking-tight dark:text-neutral-300 text-base")}>
      {typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children.map((child, i) =>
            typeof child === "string" ? (
              child
            ) : (
              <React.Fragment key={i}>{child}</React.Fragment>
            )
          )
        : children}
    </p>
  );

  const renderAnimationContainer = (
    val: string | React.ReactNode,
    i: number
  ) => (
    <MotionContainer
      {...animationType({
        ...props,
        stopAnimating,
        reverse,
        children: val,
        i,
      })}
      key={`wrapper-${i}`}
    />
  );

  if (stopAnimating) {
    return renderPlainText();
  }

  return (
    <p
      className={cn("tracking-tight dark:text-neutral-300 text-base relative")}
    >
      {typeof children === "string" && !isLazyComponent ? (
        children
          .split(/\s+/)
          .map((val: string, i: number) => renderAnimationContainer(val, i))
      ) : isLazyComponent ? (
        Array.isArray(children) ? (
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            {children.map((val, i) => renderAnimationContainer(val, i))}
          </Suspense>
        ) : (
          renderAnimationContainer(children, props.i || 0)
        )
      ) : (
        renderAnimationContainer(children, props.i || 0)
      )}
    </p>
  );
};

const animationType = (
  props: ViewAnimationControllerProps & { i: number }
): ViewAnimationControllerProps => {
  const {
    i,
    children,
    reverse,
    transition = "smooth",
    configView,
    elementType = "div",
    mode,
    speed = 0.25,
    className,
    stopAnimating = false,
    duration = 1,
    delay = 0,
  } = props;

  const textContent =
    typeof children === "string"
      ? children?.toString().toLowerCase()
      : children;

  let animationConfig: ViewAnimationControllerProps = {
    duration,
    delay: delay + speed * i,
    transition,
    stopAnimating,
    reverse,
    configView,
    elementType,
    children: typeof children === "string" ? ` ${children} ` : children,
    mode,
    className,
  };

  if (typeof children === "string") {
    const keywords = [
      {
        word: "because",
        animation: ["fadeIn", "filterBlurIn"],
      },
      {
        word: "you-deserve",
        animation: ["fadeUp"],
      },
      {
        word: "minimalistic",
        animation: ["fadeUp"],
      },
      {
        word: "api's",
        animation: ["fadeIn", "filterBlurIn"],
      },
      {
        word: "to-animate",
        animation: ["fadeUp"],
      },
      {
        word: "everything",
        animation: ["fadeUp"],
      },
      {
        word: "powerful",
        animation: ["fadeUp"],
      },
      {
        word: "with-",
        animation: ["fadeUp"],
      },
    ];

    const matchingKeyword = keywords.find(({ word }) =>
      textContent?.toString().includes(word)
    );

    if (matchingKeyword) {
      const { animation } = matchingKeyword;

      return {
        ...animationConfig,
        mode: animation as AnimationKeys[],
        transition,
        className: cn("font-bold", providerStyle),
        delay: keywords.indexOf(matchingKeyword) + 0.1,
        duration: duration + 0.2,
      };
    }
    if (i >= text.split(/\s+/).length - 2) {
      return {
        ...animationConfig,
        duration: 1,
        delay: keywords.length + 1,
        transition: "easeIn",
        mode: ["fadeUp"],
        className: cn("font-bold", providerStyle),
      };
    }
  }

  return animationConfig;
};

export { animationType };

export default MotionText;
