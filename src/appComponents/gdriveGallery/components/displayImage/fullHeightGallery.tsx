import { useMemo, useRef, useState } from "react";
import { DisplayConfig, ImageDetail } from "../../types";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";

import { makeDescription } from "../../functions";

import ImageItem, { RenderCover } from "./imageItem";
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
  const [desc, setDesc] = useState(props.showImageDescription);
  const [index, setIndex] = useState(startIndex ?? 0);
  const ref = useRef<ReactImageGallery>(null);

  const items: ReactImageGalleryItem[] = useMemo(
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
        description: makeDescription(
          i,
          props.showImageName,
          props.showImageDescription
        )?.join(" - "),
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
        ref={ref}
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
          <ImageItem item={item} props={propsH} showDescription={desc} />
        )}
        onSlide={() => setIndex(ref.current?.getCurrentIndex() ?? 0)}
      />
      {propsH.showToggleDescritopn && (
        <ToggleDescritopnButton onClick={() => setDesc((prev) => !prev)} />
      )}
    </div>
  );
}
