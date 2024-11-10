import { List, Stack } from "@mui/material";
import CenterSpinner from "@/components/centerSpinner";

import ImageManagement from "./imageManagement";
import ScrollContainer from "@/components/scrollContainer";
import { EmptyFolder, ImageListError } from "../ImageListStatus";
import { Dispatch, SetStateAction } from "react";

interface ImagesManagementProps {
  images: gapi.client.drive.File[] | undefined;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
  error: string | null;
}

export default function ImageListManagement({
  images,
  setImages,
  error,
}: ImagesManagementProps) {
  if (images === undefined) return <CenterSpinner />;
  if (error) return <ImageListError error={error} size={20} />;
  if (images.length === 0) return <EmptyFolder size={20} />;

  return (
    <Stack
      gap={0.5}
      sx={{
        flex: 1,
      }}
    >
      <ScrollContainer>
        <List>
          {images.map((img, i) => (
            <ImageManagement key={`${img?.name}-${i}`} image={img} setImages={setImages} />
          ))}
        </List>
      </ScrollContainer>
    </Stack>
  );
}
