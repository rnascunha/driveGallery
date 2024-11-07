import {
  DisplayConfig,
  FullHeightProps,
  GalleryProps,
  GridProps,
} from "./types";
import { defaultFontConfig } from "@/components/text/constants";
import { TextConfig } from "./components/sideMenu/inputFont";

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
  objectFit: "contain",
  height: {
    value: 50,
    unit: "dvh",
  },
};

export const defaultFullHeightProps: FullHeightProps = {
  showPlay: false,
  showBullets: true,
  infinite: true,
  showFullscreenButton: false,
  showToggleDescritopn: true,
  showNav: true,
  showIndex: true,
  autoPlay: false,
  slideDuration: 450,
  slideInterval: 3000,
  objectFit: "cover",
  height: {
    value: 100,
    unit: "dvh",
  },
  borderRadius: {
    value: 0,
    unit: "px",
  },
};

const defaultTextConfig: TextConfig = {
  visibility: true,
  ...defaultFontConfig,
};

export const defaultDisplayProps: DisplayConfig = {
  type: "grid",
  maxWidth: 1000,
  backgroundColor: "#ffffff",
  logo: "",
  title: {
    ...defaultTextConfig,
    fontSize: 50,
    fontWeight: "bold",
  },
  description: {
    ...defaultTextConfig,
    fontSize: 18,
  },
  imageName: {
    ...defaultTextConfig,
    color: "#ffffff",
    fontWeight: "bold",
  },
  imageDescription: {
    ...defaultTextConfig,
    ...defaultTextConfig,
    color: "#ffffff",
    fontSize: 14,
  },
  grid: defaultGridProps,
  gallery: defaultGalleryProps,
  fullHeight: defaultFullHeightProps,
};
