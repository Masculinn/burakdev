import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionContainer } from "@/motion/components/motion-container";
import Subscribe from "../subscribe";
import Search from "./search";
import Sort from "./sort";
import Tags from "./tags";

const animation = getAnimation("blogFilter");

export default function BlogFilter() {
  return (
    <section className="sticky top-0 md:pt-4 pt-16 w-full h-auto max-h-min flex flex-col z-50 bg-background">
      <MotionContainer {...animation} />
      <div className="w-full h-auto flex md:flex-row flex-col-reverse items-center gap-2 relative justify-around">
        <div className="flex items-center gap-2 w-full">
          <Search className="md:flex-1 w-full" />
          <Sort />
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-2 md:w-auto">
          <Tags isCheckbox className="md:w-auto w-1/2" />
          <Subscribe isIcon={false} className="md:w-auto w-1/2" />
        </div>
      </div>
      <Tags className="max-w-full rounded-md md:my-4 mt-3" />
    </section>
  );
}
