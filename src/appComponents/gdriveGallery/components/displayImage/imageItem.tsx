import Image from "next/image";
import { ReactImageGalleryItem } from "react-image-gallery";
import {
  DisplayConfig,
  FullHeightProps,
  GalleryProps,
  ImageDetail,
} from "../../types";
import { Box, Stack } from "@mui/material";
import TitleHeader from "./titleHeader";

interface ImageItemProps {
  item: ReactImageGalleryItem;
  props: GalleryProps | FullHeightProps;
  showDescription: boolean;
}

export default function ImageItem({
  item,
  props,
  showDescription,
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
              : props.height
            : props.height,
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
      {item.description && showDescription && (
        <span
          className="image-gallery-description"
          style={{ left: "0", right: "initial" }}
        >
          {item.description}
        </span>
      )}
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
        height: props.fullHeight.height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{
        backgroundColor: "rgba(0,0,0,0.4)",
        width: "100%",
        px: 1,
        py: 10,
        zIndex: 10,
      }}>
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
