import Image from "next/image";
import { ReactImageGalleryItem } from "react-image-gallery";
import { GalleryProps } from "../../types";

interface ImageItemProps {
  item: ReactImageGalleryItem;
  props: GalleryProps;
  showDescription: boolean;
}

export default function ImageItem({
  item,
  props,
  showDescription,
}: ImageItemProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height:
          document.fullscreenElement !== null
            ? ["none", "right", "left"].includes(props.thumbnailsPosition)
              ? "100vh"
              : "82vh"
            : "50vh",
      }}
    >
      <>
        <Image
          src={item.original}
          fill
          sizes="500w"
          alt={item.originalAlt as string}
          style={{
            objectFit: props.objectFit,
          }}
        />
        {item.description && showDescription && (
          <span
            className="image-gallery-description"
            style={{ left: "0", right: "initial" }}
          >
            {item.description}
          </span>
        )}
      </>
    </div>
  );
}

export function ImageThumnail({ item }: { item: ReactImageGalleryItem }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <Image
        src={item.thumbnail as string}
        width={document.fullscreenElement !== null ? 100 : 200}
        height={0}
        sizes="100w"
        alt={item.originalAlt as string}
        style={{
          width: "100%",
          height: "auto",
          verticalAlign: "middle",
        }}
      />
    </div>
  );
}