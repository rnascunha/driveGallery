import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  try {
    const id = params.id;
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${id}?key=${process.env.NEXT_PUBLIC_apiKey}&fields=name,description`
    )
    const {title, description} = await response.json();
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/g/${id}`
      }
    }

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
