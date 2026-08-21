import { createMotionConfig } from ".";

export default createMotionConfig({
  cta: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "fadeIn",
        transition: "cubicElastic",
        delay: 0,
        duration: 1,
      },
      elementType: "div",
      className:
        "absolute top-0 left-2 size-16 object-cover blur-xl -z-20 bg-linear-to-r from-blue-500",
    },
  },
  timelineItem: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "fadeRight",
        transition: "gentle",
        duration: 1,
        delay: 0.25,
      },
      elementType: "div",
      controller: {
        configView: {
          once: false,
          amount: 0.25,
        },
      },
    },
  },
  copyCode: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
      },
      elementType: "div",
    },
  },
  promoCard: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "cubicBounce",
        duration: 1,
      },
      controller: {
        configView: {
          once: false,
          amount: 0.25,
        },
      },
      elementType: "div",
      className: "scale-110",
    },
  },
  promoCardText: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["textShimmer", "transformTextGlow"],
        transition: "linear",
        duration: 1,
        delay: 0.5,
      },
      config: {
        duration: 0.06,
        mode: "chars",
      },
      controller: {
        configView: {
          once: false,
          amount: 0.25,
        },
      },
      elementType: "metadata",
      wrapperClassName: "text-3xl font-secondary",
    },
  },
  promoCardBtn: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        delay: 0.35,
        duration: 0.8,
      },
      controller: {
        configView: {
          once: false,
        },
      },
      elementType: "div",
      className: "relative",
    },
  },
  recommendation: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "cubicBounce",
        duration: 1,
      },
      config: {
        duration: 0.08,
        mode: "words",
        delayLogic: "linear",
      },
      elementType: "h2",
      className:
        "font-bold tracking-tighter max-w-2xl text-shadow-2xs text-4xl md:text-5xl md:pt-12 md:pb-8 py-6",
    },
  },
  blogFilter: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeIn", "typingEffect"],
        transition: "gentle",
        duration: 2,
        delay: 2,
      },
      elementType: "div",
      className:
        "absolute top-0 left-0 size-36 bg-linear-to-br from-transparent dark:via-white/30 via-black/30 to-black/0 dark:to-white/0 blur-2xl -z-20",
    },
  },
  blogCard: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "filterBlurIn",
        transition: "gentle",
      },
      controller: {
        configView: {
          amount: 0.25,
          once: false,
        },
      },
      elementType: "div",
    },
  },
  subscribeBlur: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "fadeIn",
        transition: "smooth",
        delay: 0.5,
        duration: 1,
      },
      elementType: "div",
      className:
        "absolute top-0 left-0 size-48 bg-linear-to-br from-transparent dark:via-white/30 via-rose-500/30 to-black/0 dark:to-white/0 blur-2xl -z-10",
    },
  },
  navBlogs: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeLeft", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      elementType: "div",
    },
  },
  imagePreview: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "microWobble",
        transition: "gentle",
        duration: 1,
      },
      elementType: "div",
      className: "relative hover:z-50 shadow-2xl",
    },
  },
});
