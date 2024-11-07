"use client";

import { DisplayConfig } from "../types";
import { useEffect, useMemo, useState } from "react";

import "react-image-gallery/styles/css/image-gallery.css";
import { ImageListError, ImageListIdDefined } from "./ImageListStatus";
import { SkeletonDriveGallery } from "./skeleton";
import { listFiles } from "../functions";
import DisplayImage from "./displayImage/displayImage";
import { driveImageThumbnailURL, driveImageURL } from "@/lib/google/driveUtils";

interface DisplayImageContainerProps {
  dir: gapi.client.drive.File | null;
  props: DisplayConfig;
}

export default function DisplayImageContainer({
  dir,
  props,
}: DisplayImageContainerProps) {
  const [imagesFile, setImagesFiles] = useState<
    gapi.client.drive.File[] | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!dir) return;

    listFiles(dir.id as string)
      .then((f) => {
        setImagesFiles(f.result.files as gapi.client.drive.File[]);
      })
      .catch((e) => {
        setImagesFiles(undefined);
        setError(e.result.error.message);
      });
  }, [dir]);

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

  return <DisplayImage dir={dir} images={images} props={props} />;
}
