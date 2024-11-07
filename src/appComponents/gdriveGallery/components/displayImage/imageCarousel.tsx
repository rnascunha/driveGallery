import { useMemo, useState } from "react";
import { DisplayConfig, ImageDetail } from "../../types";
import ReactImageGallery from "react-image-gallery";

import ImageItem, { GalleryItem, ImageThumnail } from "./imageItem";
import ToggleDescritopnButton from "./toggleDescriptionButton";

import "react-image-gallery/styles/css/image-gallery.css";

interface ImageCarouselProps {
  startIndex?: number;
  props: DisplayConfig;
  images: ImageDetail[];
}

export default function ImageCarousel({
  startIndex,
  props,
  images,
}: ImageCarouselProps) {
  const [desc, setDesc] = useState(props.imageDescription.visibility);
  const [index, setIndex] = useState(startIndex ?? 0);

  const items = useMemo(
    () =>
      images.map((i) => ({
        original: i.url,
        thumbnail: i.thumbnail,
        originalAlt: i.name,
        name: props.imageName.visibility ? i.name : undefined,
        description: props.imageDescription.visibility
          ? i.description
          : undefined,
      })) as GalleryItem[],
    [images, props.imageName.visibility, props.imageDescription.visibility]
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <ReactImageGallery
        items={items}
        startIndex={index}
        infinite={props.gallery.infinite}
        showPlayButton={props.gallery.showPlay}
        showBullets={props.gallery.showBullets}
        showFullscreenButton={props.gallery.showFullscreenButton}
        showIndex={props.gallery.showIndex}
        showNav={props.gallery.showNav}
        showThumbnails={props.gallery.thumbnailsPosition !== "none"}
        thumbnailPosition={
          (props.gallery.thumbnailsPosition !== "none"
            ? props.gallery.thumbnailsPosition
            : undefined) as "top" | "right" | "bottom" | "left" | undefined
        }
        slideDuration={props.gallery.slideDuration}
        slideInterval={props.gallery.slideInterval}
        autoPlay={props.gallery.autoPlay}
        lazyLoad={true}
        renderItem={(item) => (
          <ImageItem
            item={item}
            props={props.gallery}
            name={props.imageName}
            description={props.imageDescription}
            showDescription={desc}
          />
        )}
        renderThumbInner={(i) => <ImageThumnail item={i} />}
        onSlide={(i) => setIndex(i)}
      />
      {props.gallery.showToggleDescritopn && (
        <ToggleDescritopnButton
          show={desc}
          onClick={() => setDesc((prev) => !prev)}
        />
      )}
    </div>
  );
}
