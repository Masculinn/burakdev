import MotionText from "@/motion/motion-text";

export default function Banner() {
  return (
    <section className="relative flex flex-col overflow-ellipsis md:pb-6">
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
      >
        justc0de_sessions
      </MotionText>
      <p className="text-muted-foreground pt-4 tracking-tight max-w-2xl leading-snug">
        I would love to give back to the community what I've received from it.
        The intention is simple: to create a positive karma cycle, returning
        that goodwill to the wonderful community where it has always belonged. I
        divided posts into the sessions under the name of{" "}
        <span className="font-bold font-secondary">justc0de_sessions</span>.
        Subscribe to my newsletter to get instant updates. Enjoy reading!
      </p>
    </section>
  );
}
