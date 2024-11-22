import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
  e.preventDefault();
  const section = document.querySelector(targetId);
  if (section) {
    const yOffset = -70;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};
