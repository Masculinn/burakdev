import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useState } from "react";
import SubscribeBlur from "./blur";
import SubscribeButton from "./button";
import SubscribeForm from "./form";

const meta = {
  title: "Subscribe to newsletter",
  desc: "No fluff. No tutorials. No ads. No AI made bullshit. Only human-being crafted, carefully selected and curated — latest, cutting-edge software contents.",
  footer: (
    <p className="text-xs text-muted-foreground">
      *Submitted emails are roughly protected regarding to the{" "}
      <Link
        href="https://supabase.com/docs/guides/database/postgres/row-level-security"
        target="_blank"
        className="underline underline-offset-2 hover:text-primary"
      >
        Supabase RLS
      </Link>{" "}
      rules in db where the corresponding table doesn't{" "}
      <i>even expose any select rule</i> to the public. Therefore, no need to
      hesitate or worry about 😀
    </p>
  ),
};
export default function Subscribe({ isIcon }: { isIcon: boolean }) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  if (isMobile) {
    return (
      <Drawer onOpenChange={setOpen} open={open}>
        <SubscribeButton handleOpen={handleOpen} isIcon={isIcon} />
        <DrawerContent className="overflow-hidden">
          <DrawerHeader className="text-center justify-center relative">
            <SubscribeBlur />
            <DrawerTitle className="text-2xl">{meta.title}</DrawerTitle>
            <DrawerDescription className="p-2 px-2 self-center">
              {meta.desc}
            </DrawerDescription>
          </DrawerHeader>
          <SubscribeForm />
          <DrawerFooter>{meta.footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog onOpenChange={setOpen} open={open} modal>
      <SubscribeButton handleOpen={handleOpen} isIcon={isIcon} />
      <DialogContent className="overflow-hidden">
        <DialogHeader className="relative">
          <SubscribeBlur />
          <DialogTitle className="text-2xl tracking-tight">
            {meta.title}
          </DialogTitle>
          <DialogDescription>{meta.desc}</DialogDescription>
        </DialogHeader>
        <SubscribeForm />
        <DialogFooter className="mt-2 text-start">{meta.footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
