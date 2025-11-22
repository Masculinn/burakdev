import { cn } from "@/lib/utils";
import { useWindowScroll } from "@uidotdev/usehooks";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import slugs from "@/generated/slugs.json" with { type: "json" };

type PathObjType = { href: string; children: string };
const SCROLL_THRESHOLD = 50;

export const NavigationBreadCrumb = ({ className }: { className?: string }) => {
  const { asPath } = useRouter();
  const [{ y }] = useWindowScroll();

  const scrolled = typeof y === "number" && y >= SCROLL_THRESHOLD;
  const paths = useMemo(() => extractPaths(asPath), [asPath]);

  if (paths === null) return null;

  if (paths.length === 0) {
    return (
      <Breadcrumb className={cn("w-full h-auto", className)}>
        <BreadcrumbList>
          <BreadcrumbItem className="capitalize truncate">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb
      className={cn("w-full h-auto flex items-center gap-2", className)}
    >
      <BreadcrumbList>
        {paths.map((props, idx) => {
          const hidden = scrolled && idx >= 1;
          return (
            <Fragment key={props.href}>
              <BreadcrumbItem
                aria-hidden={hidden}
                className={cn(
                  "capitalize truncate max-w-32 md:max-w-max transition-opacity duration-300",
                  paths.length > 1 && "md:text-sm text-xs",
                  hidden ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                <BreadcrumbLink tabIndex={hidden ? -1 : 0} href={props.href}>
                  {props.children}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {idx + 1 !== paths.length && (
                <BreadcrumbSeparator
                  className={cn(
                    "transition-opacity duration-300",
                    scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                >
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

function extractPaths(currPath: string): PathObjType[] | null {
  let mergedSlug = "";
  const segments = currPath.split("/").filter(Boolean);

  return segments.map((slug) => {
    const trimFragment = slug.split("#")[0];
    const trimRef = trimFragment.split("?")[0];

    const title = slugs.find((s) => s.url === trimRef)?.title;
    
    mergedSlug += `/${trimRef}`;
    
    return {
      children: title || trimRef,
      href: mergedSlug,
    } as PathObjType;
  });
}
