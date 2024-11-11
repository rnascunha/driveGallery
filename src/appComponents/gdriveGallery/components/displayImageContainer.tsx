"use client";

import { DisplayConfig } from "../types";
import { useEffect, useState } from "react";

import { listFiles } from "../functions/functions";
import DisplayImageShow from "./displayImage/displayImageShow";

import "react-image-gallery/styles/css/image-gallery.css";

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
        if (!f) return;
        setImagesFiles(f.result.files as gapi.client.drive.File[]);
      })
      .catch((e) => {
        setImagesFiles(undefined);
        setError(e.result.error.message);
      });
  }, [dir]);

  return (
    <DisplayImageShow
      dir={dir}
      images={imagesFile}
      props={props}
      error={error}
    />
  );
}
