import { AlertColor } from "@mui/material";

export interface Status {
  severity: AlertColor;
  message: string;
}

export const displayTypes = ["grid", "gallery"];
export type DisplayType = (typeof displayTypes)[number];

export const gridVariants = ["standard", "woven", "masonry"] as const;
export type GridVariant = (typeof gridVariants)[number];

export const positionTitles = ["none", "below", "bottom", "top"];
export type PositionTitle = (typeof positionTitles)[number];

export const objectFit = ["cover", "contain"];
export type ObjectFit = (typeof objectFit)[number];

export const columnTypes = ["fixed", "dinamic"];
export type ColumnType = (typeof columnTypes)[number];

export const thumbnailsPositions = ["none", "top", "right", "bottom", "left"];
export type ThumbnailsPosition = (typeof thumbnailsPositions)[number];

export interface GridProps {
  objectFit: ObjectFit;
  borderRadius: number;
  variant: GridVariant;
  gap: number;
  columnType: ColumnType;
  cols: number;
  colWidth: number;
  rows: number;
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
}

export interface DisplayConfig {
  id: string;
  type: DisplayType;
  backgroundColor: string;
  logo: string;
  color: string;
  fontFamily: string;
  maxWidth: number;
  showTitle: boolean;
  showDescription: boolean;
  showImageName: boolean;
  showImageDescription: boolean;
  grid: GridProps;
  gallery: GalleryProps;
  force: boolean;
}

const defaultGridProps: GridProps = {
  variant: "standard",
  objectFit: "cover",
  borderRadius: 0,
  gap: 1,
  columnType: "dinamic",
  cols: 4,
  colWidth: 300,
  rows: 10,
  rowHeight: 300,
  positionTitle: "none",
};

export const defaultGalleryProps: GalleryProps = {
  showPlay: false,
  showBullets: true,
  infinite: true,
  showFullscreenButton: true,
  showToggleDescritopn: false,
  showNav: true,
  showIndex: true,
  autoPlay: false,
  thumbnailsPosition: "bottom",
  slideDuration: 450,
  slideInterval: 3000,
};

export const defaultDisplayProps: DisplayConfig = {
  id: "",
  type: "grid",
  maxWidth: 1000,
  color: "#000000",
  backgroundColor: "#ffffff",
  logo: "",
  fontFamily: "Roboto",
  showTitle: true,
  showDescription: true,
  showImageName: true,
  showImageDescription: true,
  grid: defaultGridProps,
  gallery: defaultGalleryProps,
  force: false,
};
