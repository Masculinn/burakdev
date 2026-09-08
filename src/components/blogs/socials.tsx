import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MotionImage } from "@/motion/components/motion-image";
import {
  CheckIcon,
  CopyIcon,
  LinkIcon,
  RssIcon,
  Share2Icon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import X from "../icons/svg-icons/X";
import Linkedin from "../icons/svg-icons/linkedin";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function SharePage() {
  const [copied, setCopied] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState("");

  function share(platform: "x" | "linkedin" | "facebook") {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const links = {
      x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    setCopied(false);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setFallbackUrl("");
    } catch {
      setFallbackUrl(window.location.href);
    }
  }

  const buttonClassName =
    "h-9 gap-2 rounded-full border-border/60 bg-background/60 " +
    "px-3 text-xs font-medium shadow-none transition-colors " +
    "hover:border-primary/30 hover:bg-primary/5 hover:text-primary";

  return (
    <div className="flex w-full max-w-auto flex-col gap-4 text-left">
      <div className="space-y-1.5">
        <h2 className="text-xl tracking-tighter text-foreground md:text-4xl">
          Worth sharing?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pass this page along to someone who’d enjoy it.
        </p>
      </div>

      {/** biome-ignore lint/a11y/useSemanticElements: false positive */}
      <div
        role="group"
        aria-label="Share this page"
        className="flex flex-wrap items-center gap-2 max-w-xs"
      >
        <Button
          type="button"
          variant="outline"
          className={buttonClassName}
          aria-label="Share on X (opens in a new tab)"
          onClick={() => share("x")}
        >
          <X />
          <span>Post</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className={buttonClassName}
          aria-label="Share on LinkedIn (opens in a new tab)"
          onClick={() => share("linkedin")}
        >
          <Linkedin />
          <span>LinkedIn</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className={buttonClassName}
          aria-label="Share on Facebook (opens in a new tab)"
          onClick={() => share("facebook")}
        >
          <Share2Icon aria-hidden="true" className="size-3.5" />
          <span>Facebook</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className={buttonClassName}
          onClick={copyLink}
        >
          {copied ? (
            <CheckIcon aria-hidden="true" className="size-3.5" />
          ) : (
            <CopyIcon aria-hidden="true" className="size-3.5" />
          )}
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <Link href="/rss.xml" target="_blank" rel="noopener noreferrer" />
          }
          aria-label="Subscribe button"
          className={buttonClassName}
        >
          <RssIcon className="size-4" />
          <span>RSS</span>
        </Button>
      </div>

      <span role="status" className="sr-only">
        {copied ? "Page link copied to clipboard." : ""}
      </span>

      {fallbackUrl && (
        <label className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          Couldn’t copy automatically. Select and copy this link:
          <input
            readOnly
            value={fallbackUrl}
            onFocus={(event) => event.currentTarget.select()}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm text-foreground"
          />
        </label>
      )}
    </div>
  );
}

function SocialsComponent({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "w-full h-auto md:h-88 overflow-hidden relative rounded-xl flex md:flex-row flex-col-reverse md:mb-0 mb-4",
        className,
      )}
    >
      <MotionImage
        animation={{
          mode: [
            "rotateRoll",
            "scaleZoomIn",
            "rotateFlipY",
            !isMobile ? "opacity" : "flash",
          ],
          transition: "cubicElastic",
          duration: isMobile ? 3 : 1,
          delay: 0,
        }}
        config={{
          duration: isMobile ? 2 : 1.2,
          img: "/assets/newsletter.svg",
          delayLogic: isMobile ? "jitter" : "pendulum",
          fn: !isMobile ? "hover" : undefined,
          pieces: isMobile ? 49 : 81,
        }}
        wrapperClassName="md:h-full md:w-2/5 w-full h-44 overflow-hidden md:rounded-none rounded-xl md:mt-0 mt-12"
      />
      <div className="md:h-full md:w-3/5 w-full h-3/5 relative bg-transparent text-center items-start md:items-start flex flex-col md:justify-center justify-end md:px-16 md:my-0 gap-4">
        <Badge variant="primary" className="text-xs">
          <LinkIcon />
          Share
        </Badge>
        <div className="inline-flex">
          <SharePage />
        </div>
      </div>
    </div>
  );
}

const Socials = dynamic(
  () =>
    Promise.resolve({
      default: SocialsComponent,
    }),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="w-full h-60 md:h-88 my-8 overflow-hidden rounded-l-none border-l-0 relative " />
    ),
  },
);

export default Socials;
