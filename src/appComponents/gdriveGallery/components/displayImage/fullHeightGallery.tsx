import { useMemo, useState } from "react";
import { DisplayConfig, ImageDetail } from "../../types";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import ImageItem, { GalleryItem, RenderCover } from "./imageItem";
import ToggleDescritopnButton from "./toggleDescriptionButton";

interface FullHeightGalleryProps {
  dir: gapi.client.drive.File;
  startIndex?: number;
  props: DisplayConfig;
  images: ImageDetail[];
}

export default function FullHeightGallery({
  startIndex,
  dir,
  props,
  images,
}: FullHeightGalleryProps) {
  const [desc, setDesc] = useState(props.imageDescription.visibility);
  const [index, setIndex] = useState(startIndex ?? 0);

  const items: GalleryItem[] = useMemo(
    () => [
      {
        original: images[0].url,
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

  const propsH = props.fullHeight;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <ReactImageGallery
        items={items}
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
          />
        )}
        onSlide={(i) => setIndex(i)}
      />
      {propsH.showToggleDescritopn && (
        <ToggleDescritopnButton show={desc} onClick={() => setDesc((prev) => !prev)} />
      )}
    </div>
  );
}
