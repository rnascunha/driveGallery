import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const id = params.id;
  console.log(id);
  try {
    const fields = await fetch(
      `https://www.googleapis.com/drive/v3/files/${id}?key=${process.env.NEXT_PUBLIC_apiKey}&fields=name,description`
    );

    console.log(fields);
  } catch (e) {
    console.error(e);
  }
  return {};
  // const id = (await params).id;
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // return {
  //   title: product.title,
  //   openGraph: {
  //     images: ["/some-specific-page-image.jpg", ...previousImages],
  //   },
  // };
}

export default function DriveGalleryMenu({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
