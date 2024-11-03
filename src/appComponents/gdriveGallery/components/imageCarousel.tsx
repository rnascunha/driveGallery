import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { GalleryProps } from "../types";
import ReactImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import "./imageCarousel.css";
import { driveImageURL, removeFileNameExtension } from "../functions";
import { IconButton } from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";

function description(
  image: gapi.client.drive.File,
  showImageName: boolean,
  showImageDescription: boolean
) {
  const ret = [];
  if (image.name && showImageName)
    ret.push(removeFileNameExtension(image.name));
  if (image.description && showImageDescription) ret.push(image.description);
  if (ret.length === 0) return undefined;
  return ret.join(" - ");
}

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
  images: gapi.client.drive.File[];
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
        original: driveImageURL(i.id as string, 1000),
        thumbnail: driveImageURL(i.id as string, 100),
        description: desc
          ? description(i, showImageName, showImageDescription)
          : undefined,
      })),
    [images, showImageDescription, showImageName, desc]
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
      />
      {props.showToggleDescritopn && (
        <IconButton
          size="large"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#fff",
            filter: "drop-shadow(0 2px 2px #1a1a1a)",
            transition: "all .3s ease-out",
            outline: "none",
            "&:hover": {
              color: "#337ab7",
            },
          }}
          disableRipple
          onClick={() => toggleDescritopn(ref.current!, setDesc, setIndex)}
        >
          <NotesIcon
            sx={{
              height: "28px",
              width: "28px",
              "&:hover:": {
                transform: "scale(1.1)",
              },
            }}
          />
        </IconButton>
      )}
    </div>
  );
}
