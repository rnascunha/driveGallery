"use client";

import ImageListContainer from "@/appComponents/gdriveGallery/components/imageListContainer";
import {
  defaultDisplayProps,
  DisplayConfig,
} from "@/appComponents/gdriveGallery/types";
import Script from "next/script";
import { useState } from "react";
import { gapiScriptLoad } from "ts-dom-libs/lib/google/functions";
import {
  getConfigFile,
  mergeProps,
} from "@/appComponents/gdriveGallery/functions";
import { SkeletonDriveGallery } from "@/appComponents/gdriveGallery/components/skeleton";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

export default function GalleryPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [props, setProps] = useState<DisplayConfig>(defaultDisplayProps);

  return (
    <>
      {!loading ? (
        <SkeletonDriveGallery props={props} />
      ) : (
        <ImageListContainer
          props={{ ...mergeProps(props, props), id: params.id }}
        />
      )}
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          if (gapi.client?.drive) {
            getConfigFile(params.id).then((res) => {
              setProps(res as DisplayConfig);
              setLoading(true);
            });
            return;
          }
          gapiScriptLoad(
            process.env.NEXT_PUBLIC_apiKey as string,
            discoveryDocs,
            async () => {
              const res = await getConfigFile(params.id);
              setProps(res as DisplayConfig);
              setLoading(true);
            }
          );
        }}
      />
    </>
  );
}
