"use client";

import { cn } from "@/lib/utils";
import { MotionContainer } from "@/motion/components/motion-container";
import Link from "next/link";
import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type LinkType = { href: string; label: string };
type Entry = LinkType & { depth: 0 | 1 };
type Group = { parent: Entry; children: Entry[] };
type MDXProps = { children?: ReactNode; href?: unknown; alt?: string };

function plainText(nodes: ReactNode): string {
  let text = "";
  Children.forEach(nodes, (node) => {
    if (typeof node === "string" || typeof node === "number") text += node;
    else if (isValidElement<MDXProps>(node)) {
      text += plainText(node.props.children) || node.props.alt || "";
    }
  });
  return text;
}

function extractLinks(nodes: ReactNode): LinkType[] {
  const links: LinkType[] = [];
  function visit(children: ReactNode) {
    Children.forEach(children, (node) => {
      if (!isValidElement<MDXProps>(node)) return;
      const { href, children: inner } = node.props;
      if (typeof href === "string" && href.length > 0) {
        links.push({
          href,
          label: plainText(inner).replace(/\s+/g, " ").trim(),
        });
      } else visit(inner);
    });
  }
  visit(nodes);
  return links;
}

function targetId(href: string): string {
  try {
    return decodeURIComponent(href.slice(1));
  } catch {
    return href.slice(1);
  }
}

function localHash(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    const current = window.location;
    return url.origin === current.origin &&
      url.pathname === current.pathname &&
      url.search === current.search &&
      url.hash.length > 1
      ? url.hash
      : null;
  } catch {
    return null;
  }
}

function readEntries(root: HTMLElement, extracted: LinkType[]): Entry[] {
  const sources = extracted.flatMap((link) => {
    const href = localHash(link.href);
    return href ? [{ ...link, href }] : [];
  });

  const queues = new Map<string, LinkType[]>();

  for (const link of sources) {
    const queue = queues.get(link.href) ?? [];
    queue.push(link);
    queues.set(link.href, queue);
  }

  const topLists = Array.from(root.querySelectorAll("ol, ul")).filter(
    (list) => {
      const ancestor = list.parentElement?.closest("ol, ul");
      return !ancestor || !root.contains(ancestor);
    },
  );

  const entries: Entry[] = [];

  for (const anchor of root.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    const href = localHash(anchor.getAttribute("href") ?? "");
    if (!href) continue;

    const source = queues.get(href)?.shift();

    let listCount = 0;
    let outerList: HTMLElement | null = null;

    for (
      let node = anchor.parentElement;
      node && node !== root;
      node = node.parentElement
    ) {
      if (node.matches("ol, ul")) {
        listCount++;
        outerList = node;
      }
    }

    const index = outerList ? topLists.indexOf(outerList) : -1;
    const siblingBullet =
      outerList?.tagName === "UL" &&
      topLists
        .slice(0, Math.max(0, index))
        .some((list) => list.tagName === "OL");

    entries.push({
      href,
      label:
        source?.label ||
        anchor.textContent?.replace(/\s+/g, " ").trim() ||
        anchor.getAttribute("aria-label") ||
        targetId(href),

      depth: listCount > 1 || siblingBullet ? 1 : 0,
    });
  }
  if (entries.length) return entries;

  const levels = sources.map((link) => {
    const tag = document.getElementById(targetId(link.href))?.tagName ?? "";
    return /^H[1-6]$/.test(tag) ? Number(tag.slice(1)) : null;
  });

  const base = Math.min(
    ...levels.filter((level): level is number => level !== null),
  );

  return sources.map(
    (link, index): Entry => ({
      ...link,
      depth: levels[index] !== null && levels[index] > base ? 1 : 0,
    }),
  );
}

function groupEntries(entries: Entry[]): Group[] {
  const groups: Group[] = [];
  for (const entry of entries) {
    const previous = groups[groups.length - 1];
    if (entry.depth === 1 && previous) previous.children.push(entry);
    else groups.push({ parent: entry, children: [] });
  }
  return groups;
}

export function MdContents({
  children,
  desktopMinWidth = 1024,
  topOffset = 88,
}: {
  children?: ReactNode;
  desktopMinWidth?: number;
  topOffset?: number;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const inlineRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeHref, setActiveHref] = useState("");
  const [position, setPosition] = useState({ desktop: false, passed: false });

  const offset = Math.max(0, topOffset);

  useEffect(() => {
    setPortal(document.body);
  }, []);

  useEffect(() => {
    const root = inlineRef.current;
    if (!root) return;

    const extracted = extractLinks(children);

    const update = () => {
      const next = readEntries(root, extracted);
      setEntries((previous) =>
        previous.length === next.length &&
        previous.every(
          (entry, index) =>
            entry.href === next[index].href &&
            entry.label === next[index].label &&
            entry.depth === next[index].depth,
        )
          ? previous
          : next,
      );
    };

    update();

    const observer = new MutationObserver(update);

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["href", "aria-label"],
    });

    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    const root = endRef.current;
    if (!root) return;

    const controller = new AbortController();

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportWidth = document.documentElement.clientWidth;
      const bottom = root.getBoundingClientRect().bottom;
      const next = {
        desktop: viewportWidth >= desktopMinWidth,
        passed: bottom <= offset,
      };
      setPosition((previous) =>
        previous.desktop === next.desktop && previous.passed === next.passed
          ? previous
          : next,
      );
      let current = "";

      for (const entry of entries) {
        const heading = document.getElementById(targetId(entry.href));
        if (heading && heading.getBoundingClientRect().top <= offset + 12) {
          current = entry.href;
        }
      }
      setActiveHref(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
      signal: controller.signal,
    });
    window.addEventListener("resize", schedule, {
      signal: controller.signal,
    });

    window.addEventListener("hashchange", schedule, {
      signal: controller.signal,
    });

    const resize = new ResizeObserver(schedule);
    resize.observe(root);

    if (inlineRef.current) resize.observe(inlineRef.current);
    resize.observe(document.body);

    const intersection = new IntersectionObserver(schedule, {
      rootMargin: `-${offset}px 0px 0px 0px`,
      threshold: [0, 1],
    });

    intersection.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      controller.abort();
    };
  }, [entries, desktopMinWidth, offset]);

  const threshold = entries.length - 2;
  const activeHrefIndex = entries.findIndex(
    (entry) => entry.href === activeHref,
  );

  const visible =
    position.desktop &&
    position.passed &&
    entries.length > 0 &&
    threshold > activeHrefIndex;
  const groups = groupEntries(entries);

  useEffect(() => {
    if (!visible) return;

    const nav = sidebarRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="location"]');

    if (!nav || !active) return;

    const box = nav.getBoundingClientRect();
    const item = active.getBoundingClientRect();

    if (item.top < box.top + 12) {
      nav.scrollTop -= box.top + 12 - item.top;
    } else if (item.bottom > box.bottom - 12) {
      nav.scrollTop += item.bottom - box.bottom + 12;
    }
  }, [visible]);

  const sidebar = (
    <MotionContainer
      animation={{
        mode: ["filterBlurIn", "fadeRight"],
        transition: "overshoot",
        duration: 0.88,
      }}
      controller={{
        trigger: visible,
      }}
      elementType="aside"
      key="floating-toc"
      data-md-contents-sidebar=""
      className={cn(
        "not-prose fixed right-6 top-(--toc-top) z-50 flex flex-col p-5 xl:w-72",
        "max-h-[calc(100dvh-var(--toc-top)-1.5rem)] w-64 max-w-[calc(100vw-3rem)]",
        "overflow-hidden rounded-xl border border-border bg-background",
        "text-left font-sans text-[15px] leading-6 text-foreground shadow-lg",
        !visible && "pointer-events-none",
      )}
      style={{ "--toc-top": `${offset}px` } as CSSProperties}
    >
      <div className="mb-5 flex shrink-0 items-center gap-2.5 font-semibold tracking-tight">
        <svg
          className="size-4 shrink-0"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 3h12M2 8h9M2 13h5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
        <span>On this page</span>
      </div>
      <nav
        ref={sidebarRef}
        className="max-h-[74vh] h-auto overflow-y-scroll scrolbar-custom"
        aria-label="On this page"
      >
        <ul className="m-0 flex flex-col list-none gap-3 p-0">
          {groups.map((group, index) => (
            <li
              className="relative m-0 block p-0 before:content-none after:content-none"
              key={`${group.parent.href}:${
                // biome-ignore lint/suspicious/noArrayIndexKey: static data
                index
              }`}
            >
              <TocLink
                entry={group.parent}
                active={activeHref === group.parent.href}
                ancestorActive={group.children.some(
                  (entry) => entry.href === activeHref,
                )}
              />
              {group.children.length > 0 && (
                <ul className="mb-0 ml-0 mr-0 mt-2 block list-none space-y-3 border-l border-border py-0 pl-4.75 pr-0">
                  {group.children.map((entry, childIndex) => (
                    <li
                      className="relative m-0 block p-0 before:content-none after:content-none"
                      key={`${entry.href}:${
                        // biome-ignore lint/suspicious/noArrayIndexKey: static data
                        childIndex
                      }`}
                    >
                      <TocLink
                        entry={entry}
                        active={activeHref === entry.href}
                        nested
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </MotionContainer>
  );

  return (
    <>
      <div
        className="relative flow-root min-w-0 w-full bg-transparent"
        data-md-contents=""
        data-toc-entries={entries.length}
        data-toc-desktop={position.desktop}
        data-toc-passed={position.passed}
        data-toc-visible={visible}
      >
        <div ref={inlineRef} />
        <div ref={endRef} aria-hidden="true" className="h-px w-full" />
      </div>
      {portal && createPortal(sidebar, portal)}
    </>
  );
}

function TocLink({
  entry,
  active,
  ancestorActive = false,
  nested = false,
}: {
  entry: Entry;
  active: boolean;
  ancestorActive?: boolean;
  nested?: boolean;
}) {
  return (
    <Link
      href={entry.href}
      aria-current={active ? "location" : undefined}
      className={[
        "relative m-0 block rounded-sm border-0 bg-transparent p-0 text-[15px] font-normal leading-6 tracking-tight no-underline shadow-none wrap-anywhere hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:transition-colors motion-safe:duration-150",
        active || ancestorActive ? "text-foreground" : "text-muted-foreground",
        active && nested
          ? "before:absolute before:-left-5 before:inset-y-0.5 before:w-px before:bg-current before:content-['']"
          : "before:content-none",
      ].join(" ")}
    >
      {entry.label}
    </Link>
  );
}
