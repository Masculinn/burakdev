import { FC } from "react";
import { MDXRemote } from "next-mdx-remote";
import { MdxComponents } from "./components/mdx-components";
import { BannerCard } from "../banner-card";
import { useSelector } from "react-redux";
import { BlogPageProps, PingProps, ReduxThemeProps } from "@/interfaces";
import MotionContainer from "../MotionProvider/motion-container";
import { Badge } from "../ui/badge";
import Ping from "../ui/ping";
import SessionText from "./components/SessionText";
import Socials from "./components/Socials";
import Actions from "./components/Actions";

const Hydrate: FC<BlogPageProps> = ({ source, frontMatter }) => {
  const {
    banner_image,
    id,
    like,
    view,
    description,
    published_at,
    tags,
    title,
    level,
  } = frontMatter;

  const SESSION_NO = `JUSTCODESESSION00${id.toString()}`;
  const appTheme = useSelector(
    (state: { theme: ReduxThemeProps }) => state.theme
  );
  const publishedDate = new Date(published_at).toLocaleDateString();
  console.log(banner_image);

  const levelConfig: PingProps = {
    mode: level === 1 ? "success" : level === 2 ? "warning" : "error",
    size: "sm",
    isAnimated: true,
  };
  const blogLevel =
    level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced";

  return (
    <>
      <header className="article-header">
        <div className="relative">
          <BannerCard
            theme={appTheme}
            description={description}
            delayLogic="sinusoidal"
            transition="cubicElastic"
            title={title}
            src={banner_image}
            imageAnimationDuration={5}
            animations={["rotateFlipY"]}
            className="mt-4 lg:mt-0 max-h-max min-h-60 "
            duration={1}
          />
          <ul className="absolute bottom-4 left-4 flex gap-2 flex-row">
            {tags.map((val, idx) => (
              <MotionContainer
                key={idx}
                elementType={"li"}
                mode={[idx % 2 === 0 ? "fadeDown" : "fadeUp", "filterBlurIn"]}
                children={<Badge>{val}</Badge>}
                configView={{ once: false, amount: "some" }}
                delay={idx * 0.2}
                duration={1}
                transition="smooth"
              />
            ))}
          </ul>
          <div className="absolute top-4 right-4 flex gap-1 flex-wrap text-muted-foreground font-mono font-light text-xs">
            <span>#</span>
            <div className="flex flex-wrap gap-2">
              <SessionText text={SESSION_NO} />
            </div>
          </div>
          <div className="absolute font-mono text-muted-foreground text-xs top-4 left-4 flex gap-2 items-center justify-center">
            <Ping {...levelConfig} />
            <span>{blogLevel}</span>
          </div>
          <span className="absolute bottom-4 right-4 text-muted-foreground font-mono font-light text-xs">
            {publishedDate}
          </span>
        </div>
        <aside className="sticky top-0 py-4 w-full max-h-max mt-2 flex items-center justify-between">
          <Actions blog_id={id} like={like} view={view} />
          <Socials />
        </aside>
      </header>
      <article>
        <section className="article-content">
          <MDXRemote {...source} components={MdxComponents} />
        </section>
      </article>
    </>
  );
};

export default Hydrate;
