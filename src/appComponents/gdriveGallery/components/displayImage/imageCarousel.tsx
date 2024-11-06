import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { GalleryProps, ImageDetail } from "../../types";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import { makeDescription } from "../../functions";

import ImageItem, { ImageThumnail } from "./imageItem";
import ToggleDescritopnButton from "./toggleDescriptionButton";

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
        renderThumbInner={(i) => <ImageThumnail item={i} />}
      />
      {props.showToggleDescritopn && (
        <ToggleDescritopnButton
          onClick={() => toggleDescritopn(ref.current!, setDesc, setIndex)}
        />
      )}
    </div>
  );
}
