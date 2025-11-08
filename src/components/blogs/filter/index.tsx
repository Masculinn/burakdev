import MotionContainer from "@/motion/motion-container";
import Subscribe from "../subscribe";
import Search from "./search";
import Sort from "./sort";
import Tags from "./tags";

export default function BlogFilter() {
  return (
    <section className="sticky top-0 md:pt-4 pt-16 w-full h-auto max-h-min flex flex-col z-50 bg-background">
      <MotionContainer
        animation={{
          mode: ["fadeIn", "typingEffect"],
          transition: "gentle",
          duration: 2,
          delay: 2,
        }}
        elementType="div"
        className="absolute top-0 left-0 size-36 bg-linear-to-br from-transparent dark:via-white/30 via-black/30 to-black/0 dark:to-white/0 blur-2xl -z-20"
      />
      <div className="w-full h-auto flex md:flex-row flex-col-reverse items-center gap-2 relative justify-around">
        <div className="flex items-center gap-2 w-full">
          <Search className="md:flex-1 w-full" />
          <Sort />
        </div>
        <div className="flex flex-row items-center justify-center-safe w-full gap-2 md:w-auto px-1">
          <Tags isCheckbox className="md:w-auto w-1/3" />
          <Subscribe isIcon={false} />
        </div>
      </div>
      <Tags className="max-w-full rounded-md md:my-4 mt-3" />
    </section>
  );
}
