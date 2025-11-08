import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { ImagePreview } from "./image-preview";
import { Slider } from "./image-slider";
import { ProjectTitle } from "./project-title";

type ProjectProps = {
  images: string[];
  desc: string;
  title: string;
  role: string;
  plainLink?: string;
};

export default function Project(props: ProjectProps) {
  const isMobile = useIsMobile();
  const { desc, images, role, title, plainLink } = props;
  const [selected, setSelected] = useState<string>(images[0]);
  const handleSelected = useCallback((img: string) => setSelected(img), []);

  if (isMobile)
    return (
      <div className="grid grid-cols-2 gap-2">
        <Drawer>
          {images.map((val) => (
            <ImagePreview
              img={val}
              key={val}
              onSelect={handleSelected}
              triggerMode="drawer"
            />
          ))}
          <DrawerContent>
            <DrawerHeader>
              <Badge variant={"outline"}>My role: {role}</Badge>
              <DrawerTitle className="text-xl font-secondary tracking-tighter">
                <ProjectTitle title={title} />
              </DrawerTitle>
              <DrawerDescription className="text-start tracking-tighter text-xs">
                {desc}
              </DrawerDescription>
              <Slider
                images={images}
                selected={selected}
                plainLink={plainLink}
              />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-2">
      <Dialog modal>
        {images.map((val) => (
          <ImagePreview
            img={val}
            key={val}
            onSelect={handleSelected}
            triggerMode="dialog"
          />
        ))}
        <DialogContent>
          <DialogHeader>
            <Badge variant={"outline"}>My role: {role}</Badge>
            <DialogTitle className="text-xl font-secondary tracking-tighter text-muted-foreground">
              <ProjectTitle title={title} />
            </DialogTitle>
            <DialogDescription>{desc}</DialogDescription>
          </DialogHeader>
          <Slider selected={selected} images={images} plainLink={plainLink} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
