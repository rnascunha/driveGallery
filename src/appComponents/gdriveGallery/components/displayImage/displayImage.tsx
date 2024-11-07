import ScrollContainer from "@/components/scrollContainer";
import { DisplayConfig, ImageDetail } from "../../types";
import GalleryDisplay from "./galleryDisplay";
import GridDisplay from "./gridDisplay";
import CenterContainer from "@/components/centerContainer";
import TitleHeader from "./titleHeader";
import FullHeightDisplay from "./fullHeightDisplay";
import { Box, Stack } from "@mui/material";

interface ImageDisplayProps {
  dir: gapi.client.drive.File;
  images: ImageDetail[];
  props: DisplayConfig;
}

export default function DisplayImage({
  dir,
  images,
  props,
}: ImageDisplayProps) {
  if (props.type === "fullHeight") {
    return (
      <Box
        sx={{
          animation: "fadeIn ease 3s",
          backgroundColor: props.backgroundColor,
          width: "100wh",
          height: "100vh",
        }}
      >
        <CenterContainer
          maxWidth={props.maxWidth}
          sx={{
            px: 0,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: "100%",
            }}
          >
            <FullHeightDisplay dir={dir} images={images} props={props} />
          </Stack>
        </CenterContainer>
      </Box>
    );
  }

  return (
    <ScrollContainer
      sx={{
        backgroundColor: props.backgroundColor,
        animation: "fadeIn ease 3s",
      }}
    >
      <CenterContainer maxWidth={props.maxWidth}>
        <TitleHeader dir={dir} props={props} />
        {props.type === "grid" ? (
          <GridDisplay images={images} props={props} />
        ) : (
          <GalleryDisplay images={images} props={props} />
        )}
      </CenterContainer>
    </ScrollContainer>
  );
  return;
}
