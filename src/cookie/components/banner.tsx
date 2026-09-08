import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isProd } from "@/lib/env";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useCookie } from "../use-cookie";

const Banner = () => {
  const { setPreferencesModalOpen, saveConsent } = useCookie();
  const handleOpenPreferences = () => setPreferencesModalOpen(true);
  const handleCookies = (analytics: boolean) => {
    const persisted = saveConsent(
      analytics,
      analytics ? "accept_all" : "reject_all",
    );
    if (!persisted)
      toast.warning(
        "Your choice applies in this tab, but browser storage is unavailable. It may be requested again after refresh.",
      );
  };

  return (
    <div className="fixed inset-x-4 bottom-4 md:bottom-8 md:left-8 md:right-auto md:w-96 z-50">
      <Card className="shadow-lg bg-transparent backdrop-blur-2xl">
        <div className="px-4 ">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h3 className="md:text-2xl text-xl font-semibold tracking-tighter">
                We use cookies 🍪
              </h3>
              <p className="text-xs text-muted-foreground mt-1 tracking-tight">
                We use necessary cookies to make the site work. We’d also like
                to use analytics cookies to understand how you use the site.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Button onClick={() => handleCookies(true)} variant={"default"}>
                Accept all
              </Button>
              <Button variant="outline" onClick={() => handleCookies(false)}>
                Reject
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={handleOpenPreferences}
              className="self-end justify-end"
            >
              Manage
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export function CookieBanner() {
  const { bannerVisible } = useCookie();
  if (!bannerVisible || !isProd()) return null;
  return createPortal(<Banner />, document.body);
}
