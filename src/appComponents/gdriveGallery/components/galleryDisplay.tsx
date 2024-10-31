import { DisplayConfig } from "../types";
import CenterContainer from "../../../components/centerContainer";

import ScrollContainer from "@/components/scrollContainer";
import TitleHeader from "./titleHeader";
import ImageCarousel from "./imageCarousel";
import { FontType, getFont } from "./fonts";

interface GalleryDisplayProps {
  props: DisplayConfig;
  images: gapi.client.drive.File[];
}

export default function GalleryDisplay({ images, props }: GalleryDisplayProps) {
  return (
    <ScrollContainer
      sx={{
        fontFamily: getFont(props.fontFamily as FontType),
        color: props.color,
        backgroundColor: props.backgroundColor,
      }}
    >
      <CenterContainer maxWidth={props.maxWidth}>
        <TitleHeader props={props} />
        <ImageCarousel
          props={props.gallery}
          images={images}
          showImageName={props.showImageName}
          showImageDescription={props.showImageDescription}
        />
      </CenterContainer>
    </ScrollContainer>
  );
}
