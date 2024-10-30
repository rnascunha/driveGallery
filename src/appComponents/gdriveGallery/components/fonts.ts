import { Raleway } from "next/font/google";

const raleway = Raleway({
  weight: "500",
  subsets: ["latin"],
  preload: false
});

export const fontFamily = {
  Roboto: "Roboto",
  Monospace: "Monospace",
  Arial: "Arial, sans-serif",
  Arial_Black: "Arial Black, sans-serif",
  Verdana: "Verdana, sans-serif",
  Tahoma: "Tahoma, sans-serif",
  Trebuchet_MS: "Trebuchet MS, sans-serif",
  Impact: "Impact, sans-serif",
  Gill_Sans: "Gill Sans, sans-serif",
  Times_New_Roman: "Times New Roman, serif",
  Georgia: "Georgia, serif",
  Palatino: "Palatino, serif",
  Courier: "Courier, monospace",
  Luminari: "Luminari, fantasy",
  Comic_Sans_MS: "Comic Sans MS, cursive",
  Raleway: "Raleway",
} as const;

export type FontType = keyof typeof fontFamily;

export function getFont(font: FontType) {
  return (
    (font === "Raleway" ? raleway.style.fontFamily : fontFamily[font]) ??
    "Roboto"
  );
}
