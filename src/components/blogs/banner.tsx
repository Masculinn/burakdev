import MotionText from "@/motion/motion-text";

export default function Banner({ animationKey }: { animationKey: number }) {
  return (
    <section className="relative flex flex-col text-ellipsis md:pb-6">
      <MotionText
        wrapperClassName="md:text-5xl text-3xl font-secondary"
        animation={{
          mode: ["textShimmer", "transformTextGlow"],
          transition: "linear",
          duration: 1,
          delay: 0.5,
        }}
        elementType="h1"
        config={{
          duration: 0.06,
          mode: "chars",
        }}
        key={animationKey}
      >
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
