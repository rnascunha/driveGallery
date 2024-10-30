import { useMemo } from "react";
import { GalleryProps } from "../types";
import ReactImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import "./imageCarousel.css";

function description(
  image: gapi.client.drive.File,
  showImageName: boolean,
  showImageDescription: boolean
) {
  const ret = [];
  if (image.name && showImageName) ret.push(image.name);
  if (image.description && showImageDescription) ret.push(image.description);
  if (ret.length === 0) return undefined;
  return ret.join(" - ");
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
  const items = useMemo(
    () =>
      images.map((i) => ({
        original: `https://drive.google.com/thumbnail?id=${i.id}&sz=w1000`,
        thumbnail: i.thumbnailLink as string,
        description: description(i, showImageName, showImageDescription),
      })),
    [images, showImageDescription, showImageName]
  );

  return (
    <ReactImageGallery
      items={items}
      startIndex={startIndex ?? 0}
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
  );
}
