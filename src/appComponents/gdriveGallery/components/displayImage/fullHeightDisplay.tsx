import { DisplayConfig, ImageDetail } from "../../types";
import FullHeightGallery from "./fullHeightGallery";

interface FullHeightDisplayProps {
  dir: gapi.client.drive.File;
  props: DisplayConfig;
  images: ImageDetail[];
}

export default function FullHeightDisplay({
  dir,
  images,
  props,
}: FullHeightDisplayProps) {
  return <FullHeightGallery dir={dir} props={props} images={images} />;
}
