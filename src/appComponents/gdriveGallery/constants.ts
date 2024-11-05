import { DisplayConfig, GalleryProps, GridProps } from "./types";

export const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

export const scopes = [
  "https://www.googleapis.com/auth/drive.file",
  // "https://www.googleapis.com/auth/drive",
];

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
  objectFit: "contain"
};

export const defaultDisplayProps: DisplayConfig = {
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
