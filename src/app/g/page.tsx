import GDriveGallery from "@/appComponents/gdriveGallery/gdriveGallery";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   other: {
//     "Cross-Origin-Opener-Policy": "same-origin",
//   },
// };

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <GDriveGallery id={searchParams.id} />;
}
