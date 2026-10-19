import { getAnimation } from "@/lib/motion/getAnimation";
import { MotionText } from "@/motion/components/motion-text";
import { Badge } from "../ui/badge";

export default function Banner() {
  return (
    <section className="relative flex flex-col text-ellipsis md:pb-6">
      <Badge variant="outline" className="mb-2">
        Articles
      </Badge>
      <MotionText {...getAnimation("banner")}>JavaScript Sessions</MotionText>
      <div className="text-muted-foreground max-w-2xl text-ellipsis leading-snug">
        <p className="pt-4 tracking-tight">
          I write occasionally about full-stack development. I like to deep dive
          in such topics with ease, mention the potential bottlenecks, pros and
          cons.
        </p>
        <p className="pt-4 tracking-tight">
          Pretty much everything about the web using cutting-edge techs.
        </p>
      </div>
    </section>
  );
}
