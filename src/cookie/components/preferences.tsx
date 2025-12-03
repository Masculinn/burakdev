import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCookie } from "../hooks";

export function CookiePreferences() {
  const {
    setPreferencesModalOpen,
    preferencesModalOpen,
    consent,
    setConsentState,
  } = useCookie();

  const handleSavePreferences = () => {
    setPreferencesModalOpen(false);
    toast.success("Your preferences have been saved.", {
      richColors: true,
    });
  };

  const handleCheckedChange = (e: boolean) => {
    setConsentState(() => ({ analytics: e, necessary: true }));
    toast.info("Your preferences has changed.", {
      richColors: true,
    });
  };

  const checked = consent === null ? true : consent.analytics;

  return (
    <Dialog
      open={preferencesModalOpen}
      onOpenChange={setPreferencesModalOpen}
      modal
    >
      <DialogContent className="dark:bg-transparent backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Cookie preferences</DialogTitle>
          <DialogDescription>
            Choose which cookies you allow. You can change this later in site
            preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid gap-3">
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <div className="font-medium tracking-tight">Necessary</div>
              <p className="text-sm text-muted-foreground">
                Required for the site to work.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <Switch id="analytics-switch" disabled checked={true} />
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <div className="font-medium tracking-tight">Analytics</div>
              <div className="md:text-sm text-xs text-muted-foreground">
                Helps us improve the site. No personal identifiers are stored.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="analytics-switch" className="sr-only">
                Analytics
              </Label>
              <Switch
                id="analytics-switch"
                checked={checked}
                onCheckedChange={handleCheckedChange}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-end items-center">
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={handleSavePreferences}>
                Save and close
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
