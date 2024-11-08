import { Box, Stack } from "@mui/material";
import { DisplayConfig, ImageDetail } from "../../types";
import FullHeightGallery from "./fullHeightGallery";
import CenterContainer from "@/components/centerContainer";
import { useMemo, useState } from "react";
import { ReactImageGalleryItem } from "react-image-gallery";
import { GalleryItem, RenderCover } from "./imageItem";
import BackgroundImageTransition from "./backgroundImageTransition";

interface FullHeightDisplayProps {
  dir: gapi.client.drive.File;
  props: DisplayConfig;
  images: ImageDetail[];
}

export default function FullHeightDisplay({
  dir,
  images,
  props,
}: FullHeightDisplayProps) {
  const [index, setIndex] = useState(0);

  const items: GalleryItem[] = useMemo(
    () => [
      {
        original: images[0].url,
        thumbnail: images[0].thumbnail,
        renderItem: () => (
          <RenderCover image={images[0]} dir={dir} props={props} />
        ),
      },
      ...(images.map((i) => ({
        original: i.url,
        thumbnail: i.thumbnail,
        originalAlt: i.name,
        name: props.imageName.visibility ? i.name : undefined,
        description: props.imageDescription.visibility
          ? i.description
          : undefined,
      })) as ReactImageGalleryItem[]),
    ],
    [images, dir, props]
  );

  return (
    <Box
      sx={{
        animation: "fadeIn ease 3s",
        backgroundColor: props.backgroundColor,
        width: "100vw",
        height: "100vh",
      }}
    >
      <CenterContainer
        maxWidth={props.maxWidth}
        sx={{
          px: 0,
        }}
      >
        {props.fullHeight.backgroundImage && (
          <BackgroundImageTransition images={items} index={index} />
        )}
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "100%",
          }}
        >
          <FullHeightGallery
            index={index}
            setIndex={setIndex}
            props={props}
            images={items}
          />
        </Stack>
      </CenterContainer>
    </Box>
  );
}
