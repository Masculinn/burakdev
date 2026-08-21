import { Card } from "@/components/ui/card";
import type { BlogType } from "@/interfaces";
import { MotionText } from "@/motion/components/motion-text";
import { NotFoundCircle } from "./posts/not-found";

export default function SessionOver({
  sessionId,
}: {
  sessionId: BlogType["id"];
}) {
  const text = `#justc0de_session00${sessionId} is over.`;
  return (
    <Card className="flex flex-col bg-transparent md:py-14 py-12 my-4 relative overflow-hidden items-center-safe justify-center-safe text-center px-8 md:px-0">
      <NotFoundCircle className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/6" />
      <MotionText
        config={{
          duration: 0.05,
          mode: "chars",
          delayLogic: "triangle",
        }}
        elementType="p"
        animation={{
          mode: ["flash", "textShimmer", "filterBlurIn"],
          transition: "smooth",
          duration: 1.5,
          delay: 0.5,
        }}
        controller={{
          configView: {
            once: false,
            amount: 0.25,
          },
        }}
        wrapperClassName="font-secondary text-2xl md:text-4xl text-shadow-2xs tracking-tighter text-center text-neutral-900 dark:text-stone-300 z-50 self-center justify-center"
      >
        {text}
      </MotionText>
    </Card>
  );
}
