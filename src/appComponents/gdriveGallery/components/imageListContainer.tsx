"use client";

import { DisplayConfig } from "../types";
import { useEffect, useState } from "react";

import "react-image-gallery/styles/css/image-gallery.css";
import GridDisplay from "./gridDisplay";
import GalleryDisplay from "./galleryDisplay";
import { ImageListError, ImageListIdDefined } from "./ImageListStatus";
import { SkeletonDriveGallery } from "./skeleton";
import { listFiles } from "../functions";

export default function ImageListContainer({
  props,
}: {
  props: DisplayConfig;
}) {
  const [images, setImages] = useState<gapi.client.drive.File[] | undefined>(
    undefined
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!props.id) return;

    listFiles(props.id)
      .then((f) => {
        setImages(f.result.files as gapi.client.drive.File[]);
      })
      .catch((e) => {
        setImages(undefined);
        setError(e.result.error.message);
      });
  }, [props.id, props.force]);

  if (error !== null) return <ImageListError error={error} />;
  if (!props.id) return <ImageListIdDefined />;
  if (images === undefined) return <SkeletonDriveGallery props={props} />;

  return props.type === "grid" ? (
    <GridDisplay images={images} props={props} />
  ) : (
    <GalleryDisplay images={images} props={props} />
  );
}
