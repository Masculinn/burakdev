import MotionContainer from "@/motion/motion-container";

export default function SubscribeBlur() {
  return (
    <MotionContainer
      animation={{
        mode: "fadeIn",
        transition: "smooth",
        delay: 0.5,
        duration: 1,
      }}
      elementType="div"
      className="absolute top-0 left-0 size-48 bg-linear-to-br from-transparent dark:via-white/30 via-rose-500/30 to-black/0 dark:to-white/0 blur-2xl -z-10"
    />
  );
}
