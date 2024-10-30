import { driveImageURL } from "@/appComponents/gdriveGallery/functions";
import { Metadata } from "next";
import { ReactNode } from "react";

const baseDriveFiles = "https://www.googleapis.com/drive/v3/files";

async function getTitleInfo(id: string) {
  const response = await fetch(
    `${baseDriveFiles}/${id}?key=${process.env.NEXT_PUBLIC_apiKey}&fields=name,description`
  );  
  return await response.json();
}

async function getImage(id: string) {
  const url = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_apiKey as string,
    pageSize: "1",
    fields: "files(id)",
    q: `('${id}' in parents) and trashed = false and (mimeType contains 'image/')`,
    spaces: "drive",
  });
  const response = await fetch(`${baseDriveFiles}?${url.toString()}`);
  return await response.json();
}

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  try {
    const id = params.id;
    const [title, image] = await Promise.all([getTitleInfo(id), getImage(id)]);

    return {
      title: title.name ?? id,
      description: title.description ?? id,
      openGraph: {
        title: title.name ?? id,
        description: title.description ?? id,
        url: `${id}`,
        images: [
          image.files.length === 1
            ? {
                url: driveImageURL(image.files[0].id, 400),
                width: 400,
              }
            : {
                url: "/app-image.png",
                width: 604,
                height: 603,
              },
        ],
      },
    };
  } catch (e) {
    console.error(e);
    return {};
  }
}

export default function DriveGalleryMenu({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
