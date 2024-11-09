import { Box } from "@mui/material";
import { GalleryItem } from "./imageItem";

interface BackgroundImageTransitionProps {
  images: GalleryItem[];
  index: number;
  transition?: number;
}

export default function BackgroundImageTransition({
  images,
  index,
  transition = 1000,
}: BackgroundImageTransitionProps) {
  return (
    <>
      {images.map((img, i) => (
        <Box
          key={`${img.original}-${i}`}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${img.original})`,
            backgroundPosition: "50% 50%",
            transition: `opacity ${transition}ms ease-in-out`,
            filter: "blur(8px)",
            opacity: index === i ? 1 : 0,
          }}
        ></Box>
      ))}
    </>
  );
}
