import GDriveGallery from "@/appComponents/gdriveGallery/gdriveGallery";

export default function GalleryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  
  return <GDriveGallery id={searchParams.id} />;
}
