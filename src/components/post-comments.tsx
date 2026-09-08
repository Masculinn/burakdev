import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Giscus = dynamic(() => import("@giscus/react"), { ssr: false });

const CATEGORY = "Announcements";
const CATEGORY_ID = "DIC_kwDOO-ruoM4DFG3j";

export default function PostComments() {
  const { isReady, asPath } = useRouter();
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (isReady) {
      setPathname(asPath.split(/[?#]/)[0]);
    }
  }, [isReady, asPath]);

  const configured =
    CATEGORY.trim().length > 0 &&
    CATEGORY_ID.trim().length > 0 &&
    !CATEGORY.startsWith("[") &&
    !CATEGORY_ID.startsWith("[");

  return (
    <section aria-label="Post comments" className="mt-16 md:px-8">
      {!configured ? (
        <p>Comments are not configured yet.</p>
      ) : (
        <>
          {pathname !== null && (
            <Giscus
              key={pathname}
              id="post-comments"
              repo="Masculinn/burakdev"
              repoId="R_kgDOO-ruoA"
              category={CATEGORY}
              categoryId={CATEGORY_ID}
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="preferred_color_scheme"
              lang="en"
            />
          )}
          <noscript>Enable JavaScript to read and add comments.</noscript>
        </>
      )}
    </section>
  );
}
