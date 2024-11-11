import Image from "next/image";
import { ReactImageGalleryItem } from "react-image-gallery";
import {
  DisplayConfig,
  FullHeightProps,
  GalleryProps,
  ImageDetail,
} from "../../types";
import { Box, Stack, Typography } from "@mui/material";
import TitleHeader from "./titleHeader";
import { ValueUnit } from "@/components/inputUnit";
import { makeStyle } from "../../functions/functions";
import { TextConfig } from "../sideMenu/inputFont";
import { removeFileNameExtension } from "../../functions/utility";

function toValueUnit<T extends string>(v: string | ValueUnit<T>) {
  return typeof v === "string" ? v : `${v.value}${v.unit}`;
}

export interface GalleryItem extends ReactImageGalleryItem {
  name?: string;
}

interface ImageDescriptionProps {
  item: GalleryItem;
  name: TextConfig;
  description: TextConfig;
  showDescription: boolean;
  defaultFontFamily: string;
}

function ImageDescription({
  item,
  name,
  description,
  showDescription,
  defaultFontFamily,
}: ImageDescriptionProps) {
  if ((!item.description && !item.name) || !showDescription) return;
  return (
    <Stack
      className="image-gallery-description"
      alignItems="flex-start"
      sx={{
        left: "0",
        right: "initial",
      }}
      gap={1}
    >
      {item.name && (
        <Typography sx={makeStyle(name, defaultFontFamily)}>
          {removeFileNameExtension(item.name)}
        </Typography>
      )}
      {item.description && (
        <Typography sx={makeStyle(description, defaultFontFamily)}>
          {item.description}
        </Typography>
      )}
    </Stack>
  );
}

interface ImageItemProps {
  item: GalleryItem;
  props: GalleryProps | FullHeightProps;
  name: TextConfig;
  description: TextConfig;
  showDescription: boolean;
  defaultFontFamily: string;
}

export default function ImageItem({
  item,
  props,
  name,
  description,
  showDescription,
  defaultFontFamily,
}: ImageItemProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height:
          "thumbnailsPosition" in props
            ? document.fullscreenElement !== null
              ? ["none", "right", "left"].includes(props.thumbnailsPosition)
                ? "100vh"
                : "82vh"
              : toValueUnit(props.height)
            : toValueUnit(props.height),
      }}
    >
      <Image
        src={item.original}
        fill
        sizes="500w, 1000w"
        alt={item.originalAlt as string}
        style={{
          objectFit: props.objectFit,
          borderRadius:
            "borderRadius" in props
              ? `${props.borderRadius.value}${props.borderRadius.unit}`
              : undefined,
        }}
        priority
      />
      <ImageDescription
        item={item}
        name={name}
        description={description}
        showDescription={showDescription}
        defaultFontFamily={defaultFontFamily}
      />
    </div>
  );
}

export function ImageThumnail({ item }: { item: ReactImageGalleryItem }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <Image
        src={item.thumbnail as string}
        width={document.fullscreenElement !== null ? 100 : 200}
        height={0}
        sizes="100w"
        alt={item.originalAlt as string}
        style={{
          width: "100%",
          height: "auto",
          verticalAlign: "middle",
        }}
      />
    </div>
  );
}

export function RenderCover({
  image,
  dir,
  props,
}: {
  image: ImageDetail;
  dir: gapi.client.drive.File | null;
  props: DisplayConfig;
}) {
  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        height: `${props.fullHeight.height.value}${props.fullHeight.height.unit}`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
          width: "100%",
          px: 8,
          py: 5,
          zIndex: 10,
        }}
      >
        <TitleHeader dir={dir} props={props} />
      </Box>
      <Image
        src={image.url}
        sizes="1000w"
        alt={image.name}
        fill
        priority
        style={{
          objectFit: props.fullHeight.objectFit,
          borderRadius:
            "borderRadius" in props.fullHeight
              ? `${props.fullHeight.borderRadius.value}${props.fullHeight.borderRadius.unit}`
              : undefined,
        }}
      />
    </Stack>
  );
}
