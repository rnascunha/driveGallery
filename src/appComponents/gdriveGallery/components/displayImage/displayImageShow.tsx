import { useMemo } from "react";
import { DisplayConfig } from "../../types";
import { driveImageThumbnailURL, driveImageURL } from "@/lib/google/driveUtils";
import {
  EmptyFolder,
  ImageListError,
  ImageListIdDefined,
} from "../ImageListStatus";
import { SkeletonDriveGallery } from "../skeleton";
import DisplayImage from "./displayImage";

interface DisplayImageShowProps {
  dir: gapi.client.drive.File | null;
  images: gapi.client.drive.File[] | undefined;
  props: DisplayConfig;
  error: string | null;
}

export default function DisplayImageShow({
  dir,
  images: imagesFile,
  props,
  error,
}: DisplayImageShowProps) {
  const images = useMemo(() => {
    return imagesFile?.map((img) => ({
      id: img.id as string,
      name: img.name as string,
      url:
        props.maxWidth === 0
          ? driveImageURL(img.id as string)
          : driveImageThumbnailURL(img.id as string, props.maxWidth),
      thumbnail: driveImageThumbnailURL(img.id as string, 100),
      description: img.description,
    }));
  }, [imagesFile, props.maxWidth]);

  if (error !== null) return <ImageListError error={error} />;
  if (!dir) return <ImageListIdDefined />;
  if (images === undefined) return <SkeletonDriveGallery props={props} />;
  if (images.length === 0) return <EmptyFolder />;

  return <DisplayImage dir={dir} images={images} props={props} />;
}
