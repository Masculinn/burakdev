export function getImgAlt(img: string) {
  if (!img) return "image";
  return img.split("/")[img.split("/").length - 1].split(".")[0];
}
