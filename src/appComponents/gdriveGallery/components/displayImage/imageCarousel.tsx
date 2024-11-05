import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { GalleryProps, ImageDetail } from "../../types";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import { makeDescription } from "../../functions";
import { IconButton, SxProps } from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";
import ImageItem from "./imageItem";

const buttonStyle: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  color: "#fff",
  filter: "drop-shadow(0 2px 2px #1a1a1a)",
  transition: "all .3s ease-out",
  outline: "none",
  p: "20px",
  "&:hover": {
    color: "#337ab7",
    transform: "scale(1.2)",
  },
};

const iconStyle: SxProps = {
  height: "28px",
  width: "28px",
};

function toggleDescritopn(
  gallery: ReactImageGallery,
  setDesc: Dispatch<SetStateAction<boolean>>,
  setIndex: Dispatch<SetStateAction<number>>
) {
  setIndex(gallery.getCurrentIndex());
  setDesc((prev) => !prev);
}

interface ImageCarouselProps {
  startIndex?: number;
  props: GalleryProps;
  images: ImageDetail[];
  showImageDescription: boolean;
  showImageName: boolean;
}

export default function ImageCarousel({
  startIndex,
  props,
  images,
  showImageDescription,
  showImageName,
}: ImageCarouselProps) {
  const [desc, setDesc] = useState(showImageDescription);
  const [index, setIndex] = useState(startIndex ?? 0);
  const ref = useRef<ReactImageGallery>(null);

  const items = useMemo(
    () =>
      images.map((i) => ({
        original: i.url,
        thumbnail: i.thumbnail,
        originalAlt: i.name,
        description: makeDescription(
          i,
          showImageName,
          showImageDescription
        )?.join(" - "),
      })) as ReactImageGalleryItem[],
    [images, showImageDescription, showImageName]
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <ReactImageGallery
        ref={ref}
        items={items}
        startIndex={index}
        infinite={props.infinite}
        showPlayButton={props.showPlay}
        showBullets={props.showBullets}
        showFullscreenButton={props.showFullscreenButton}
        showIndex={props.showIndex}
        showNav={props.showNav}
        showThumbnails={props.thumbnailsPosition !== "none"}
        thumbnailPosition={
          (props.thumbnailsPosition !== "none"
            ? props.thumbnailsPosition
            : undefined) as "top" | "right" | "bottom" | "left" | undefined
        }
        slideDuration={props.slideDuration}
        slideInterval={props.slideInterval}
        autoPlay={props.autoPlay}
        lazyLoad={true}
        renderItem={(item) => (
          <ImageItem item={item} props={props} showDescription={desc} />
        )}
      />
      {props.showToggleDescritopn && (
        <IconButton
          size="large"
          sx={buttonStyle}
          disableRipple
          onClick={() => toggleDescritopn(ref.current!, setDesc, setIndex)}
        >
          <NotesIcon sx={iconStyle} />
        </IconButton>
      )}
    </div>
  );
}
