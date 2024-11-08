import { ValueUnit } from "@/components/inputUnit";
import { AlertColor } from "@mui/material";
import { TextConfig } from "./components/sideMenu/inputFont";

export interface Status {
  severity: AlertColor;
  message: string;
}

export const displayTypes = ["grid", "gallery", "fullHeight"] as const;
export type DisplayType = (typeof displayTypes)[number];

export const gridVariants = ["standard", "woven", "masonry"] as const;
export type GridVariant = (typeof gridVariants)[number];

export const positionTitles = ["none", "below", "bottom", "top"] as const;
export type PositionTitle = (typeof positionTitles)[number];

export const objectFit = ["cover", "contain"] as const;
export type ObjectFit = (typeof objectFit)[number];

export const columnTypes = ["fixed", "dinamic"] as const;
export type ColumnType = (typeof columnTypes)[number];

export const thumbnailsPositions = [
  "none",
  "top",
  "right",
  "bottom",
  "left",
] as const;
export type ThumbnailsPosition = (typeof thumbnailsPositions)[number];

export const borderRadiusUnits = ["px", "%"] as const;
export type BorderRadiusUnit = (typeof borderRadiusUnits)[number];

export const heightUnits = ["dvh", "px"] as const;
export type HieghtUnit = (typeof heightUnits)[number];

export interface GridProps {
  objectFit: ObjectFit;
  borderRadius: number;
  variant: GridVariant;
  gap: number;
  columnType: ColumnType;
  cols: number;
  colWidth: number;
  rowHeight: number;
  positionTitle: PositionTitle;
}

export interface GalleryProps {
  showPlay: boolean;
  showBullets: boolean;
  infinite: boolean;
  showNav: boolean;
  showIndex: boolean;
  showFullscreenButton: boolean;
  showToggleDescritopn: boolean;
  autoPlay: boolean;
  thumbnailsPosition: ThumbnailsPosition;
  slideDuration: number;
  slideInterval: number;
  objectFit: ObjectFit;
  height: ValueUnit<HieghtUnit>;
}

export interface FullHeightProps {
  showPlay: boolean;
  showBullets: boolean;
  infinite: boolean;
  showNav: boolean;
  showIndex: boolean;
  showFullscreenButton: boolean;
  showToggleDescritopn: boolean;
  autoPlay: boolean;
  slideDuration: number;
  slideInterval: number;
  objectFit: ObjectFit;
  height: ValueUnit<HieghtUnit>;
  borderRadius: ValueUnit<BorderRadiusUnit>;
  backgroundImage: boolean;
}

export interface DisplayConfig {
  type: DisplayType;
  backgroundColor: string;
  logo: string;
  maxWidth: number;
  defaultFontFamilty: string;
  title: TextConfig;
  description: TextConfig;
  imageName: TextConfig;
  imageDescription: TextConfig;
  grid: GridProps;
  gallery: GalleryProps;
  fullHeight: FullHeightProps;
}

export interface ImageDetail {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  description?: string;
}
