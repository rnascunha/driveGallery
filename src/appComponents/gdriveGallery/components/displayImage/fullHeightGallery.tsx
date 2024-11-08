import { Dispatch, SetStateAction, useState } from "react";
import { DisplayConfig } from "../../types";
import ReactImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import ImageItem, { GalleryItem } from "./imageItem";
import ToggleDescritopnButton from "./toggleDescriptionButton";

interface FullHeightGalleryProps {
  images: GalleryItem[];
  props: DisplayConfig;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

export default function FullHeightGallery({
  images,
  props,
  index,
  setIndex,
}: FullHeightGalleryProps) {
  const [desc, setDesc] = useState(props.imageDescription.visibility);
  const propsH = props.fullHeight;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <ReactImageGallery
        items={images}
        startIndex={index}
        infinite={propsH.infinite}
        showPlayButton={propsH.showPlay}
        showBullets={propsH.showBullets}
        showFullscreenButton={propsH.showFullscreenButton}
        showIndex={propsH.showIndex}
        showNav={propsH.showNav}
        showThumbnails={false}
        thumbnailPosition={undefined}
        slideDuration={propsH.slideDuration}
        slideInterval={propsH.slideInterval}
        autoPlay={propsH.autoPlay}
        lazyLoad={true}
        renderItem={(item) => (
          <ImageItem
            item={item}
            props={propsH}
            name={props.imageName}
            description={props.imageDescription}
            showDescription={desc}
            defaultFontFamily={props.defaultFontFamilty}
          />
        )}
        onSlide={(i) => setIndex(i)}
      />
      {propsH.showToggleDescritopn && (
        <ToggleDescritopnButton
          show={desc}
          onClick={() => setDesc((prev) => !prev)}
        />
      )}
    </div>
  );
}
