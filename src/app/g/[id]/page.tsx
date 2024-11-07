"use client";

import { DisplayConfig } from "@/appComponents/gdriveGallery/types";
import Script from "next/script";
import { useState } from "react";
import { gapiScriptLoad } from "ts-dom-libs/lib/google/functions";
import {
  getConfigFile,
  mergeProps,
} from "@/appComponents/gdriveGallery/functions";
import { SkeletonDriveGallery } from "@/appComponents/gdriveGallery/components/skeleton";
import {
  defaultDisplayProps,
  discoveryDocs,
} from "@/appComponents/gdriveGallery/constants";
import DisplayImageContainer from "@/appComponents/gdriveGallery/components/displayImageContainer";
import { isDriveId } from "@/lib/google/driveUtils";

async function getFolder(id: string) {
  return await gapi.client.drive.files
    .get({
      fileId: id,
      fields: "id, name, description, mimeType",
    })
    .then((f) => {
      if (f.result.mimeType !== "application/vnd.google-apps.folder")
        return { error: {}, message: `ID '${id}' is not a directory!` };
      return f.result;
    })
    .catch((e) => {
      return { error: e, message: e.error.message as string };
    });
}

async function getData(id: string, props: DisplayConfig) {
  return Promise.all([getFolder(id), getConfigFile(id)]).then(([f, c]) => {
    return [
      "error" in f ? null : f,
      c !== undefined ? mergeProps(c[1], props) : props,
    ] as [null | gapi.client.drive.File, DisplayConfig];
  });
}

export default function GalleryPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [dir, setDir] = useState<gapi.client.drive.File | null | undefined>(
    isDriveId(params.id) ? undefined : null
  );
  const [props, setProps] = useState<DisplayConfig>(defaultDisplayProps);

  const call = () =>
    getData(params.id, props).then(([f, c]) => {
      setDir(f);
      setProps(c);
    });

  if (dir === null) throw new Error(`'${params.id}' is not a valid ID`);

  return (
    <>
      {dir === undefined ? (
        <SkeletonDriveGallery props={props} />
      ) : (
        <DisplayImageContainer
          dir={dir as gapi.client.drive.File}
          props={props}
        />
      )}
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          if (gapi.client?.drive) {
            call();
            return;
          }
          gapiScriptLoad(
            process.env.NEXT_PUBLIC_apiKey as string,
            discoveryDocs,
            call
          );
        }}
      />
    </>
  );
}
