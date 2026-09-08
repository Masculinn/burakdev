import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionText } from "@/motion/components/motion-text";

export default function Banner({ animationKey }: { animationKey: number }) {
  return (
    <section className="relative flex flex-col text-ellipsis md:pb-6">
      <MotionText {...getAnimation("banner")} key={animationKey}>
        justc0de_sessions
      </MotionText>
      <p className="text-muted-foreground pt-4 tracking-tight max-w-2xl leading-snug">
        Sometimes, fairies come and whisper in my ear, inspiring me. For some
        reason, I found myself typing something on the keyboard. That's why I
        named it "Sessions." 😅
      </p>
      <p className="text-muted-foreground pt-4 tracking-tight max-w-2xl leading-snug ">
        Don't forget to subscribe to my newsletter for instant updates! Enjoy
        reading!
      </p>
    </section>
  );
}
