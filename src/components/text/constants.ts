export const defaultFontConfig: FontConfig = {
  fontWeight: "normal",
  fontStyle: "normal",
  color: "#000000",
  fontFamily: "Monospace",
  textDecoration: "none",
  fontSize: 16,
};

import { Raleway } from "next/font/google";
import { FontConfig } from "./types";

const raleway = Raleway({
  weight: "500",
  subsets: ["latin"],
  preload: false,
});

export const fontFamilyArray = [
  "Roboto",
  "Monospace",
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Arial Black, sans-serif", label: "Arial Black" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
  { value: "Impact, sans-serif", label: "Impact" },
  { value: "Gill Sans, sans-serif", label: "Gill Sans" },
  {
    value: "Times New Roman, serif",
    label: "Times New Roman",
  },
  { value: "Georgia, serif", label: "" },
  { value: "Palatino, serif", label: "Palatino" },
  { value: "Courier, monospace", label: "Courier" },
  { value: "Luminari, fantasy", label: "Luminari" },
  { value: "Comic Sans MS, cursive", label: "Comic Sans MS" },
  { value: raleway.style.fontFamily, label: "Raleway" },
] as const;
