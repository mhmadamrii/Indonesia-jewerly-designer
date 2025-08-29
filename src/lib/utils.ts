import { type ClassValue, clsx } from "clsx";
import { File, ImageIcon, Play } from "lucide-react";
import { type ReactElement, createElement } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function getFileIcon(type: string): ReactElement {
  if (type.startsWith("image/"))
    return createElement(ImageIcon, { className: "h-4 w-4" });

  if (type.startsWith("video/")) return createElement(Play, { className: "h-4 w-4" });

  if (type.match(/glb|gltf|obj|stl/))
    return createElement(File, { className: "h-4 w-4" });
  return createElement(File, { className: "h-4 w-4" });
}

export function getCategoryFolder(category: string) {
  switch (category) {
    case "thumbnail":
      return "thumbnails";
    case "preview":
      return "previews";
    case "asset":
      return "assets";
  }
}
