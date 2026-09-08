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
import { useState } from "react";
import { toast } from "sonner";
import { useCookie } from "../use-cookie";

export function CookiePreferences() {
  const { ready, preferencesModalOpen } = useCookie();
  // A fresh draft on each open; closing without saving discards all edits.
  if (!ready || !preferencesModalOpen) return null;
  return <PreferencesDialog />;
}

function PreferencesDialog() {
  const { setPreferencesModalOpen, consent, saveConsent } = useCookie();
  const [checked, setChecked] = useState(consent?.analytics ?? false);
  const handleSavePreferences = () => {
    const persisted = saveConsent(checked, "preferences");
    if (persisted) toast.success("Your preferences have been saved.");
    else toast.warning("Your choice applies in this tab, but browser storage is unavailable. It may be requested again after refresh.");
  };

  return (
    <Dialog
      open={true}
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
              <Switch id="necessary-switch" aria-label="Necessary cookies (required)" disabled checked={true} />
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-md p-3">
            <div>
              <div className="font-medium tracking-tight">Analytics</div>
              <div className="md:text-sm text-xs text-muted-foreground">
                Helps us understand site usage and improve the experience.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="analytics-switch" className="sr-only">
                Analytics
              </Label>
              <Switch
                id="analytics-switch"
                checked={checked}
                onCheckedChange={setChecked}
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
