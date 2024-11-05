import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DisplayConfig, ImageDetail } from "../../types";
import ImageCarousel from "./imageCarousel";
import { FontType, getFont } from "../fonts";

import "./imgAnimation.css";
import { removeFileNameExtension } from "../../functions";

interface GridDisplayProps {
  props: DisplayConfig;
  images: ImageDetail[];
}

export default function GridDisplay({ props, images }: GridDisplayProps) {
  const [open, setOpen] = useState(-1);
  const ref = useRef<HTMLUListElement>(null);
  const [cols, setCols] = useState<number>(props.grid.cols);

  useEffect(() => {
    if (props.grid.columnType === "fixed") {
      setCols(props.grid.cols);
      return;
    }
    const calcCols = () => {
      if (!ref.current) return;
      const { width } = ref.current.getBoundingClientRect();
      setCols(Math.max(Math.floor(width / props.grid.colWidth), 1));
    };
    calcCols();
    window.addEventListener("resize", calcCols);
    return () => window.removeEventListener("resize", calcCols);
  }, [props.grid.columnType, props.grid.colWidth, props.grid.cols]);

  return (
    <>
      <ImageList
        ref={ref}
        sx={{
          width: "100%",
          height: props.grid.variant === "woven" ? "100%" : "auto",
          pb: "15px",
          animation: "fadeIn ease 3s",
        }}
        variant={props.grid.variant}
        cols={cols}
        rowHeight={props.grid.rowHeight}
        gap={props.grid.gap}
      >
        {images.map((img, i) => (
          <ImageListItem key={img.id}>
            <Image
              src={img.url}
              sizes="100"
              alt={img.name as string}
              fill
              priority
              style={{
                objectFit: props.grid.objectFit,
                cursor: "pointer",
                borderRadius: `${props.grid.borderRadius}%`,
              }}
              onClick={() => setOpen(i)}
            />
            {props.grid.positionTitle !== "none" &&
              (props.showImageName ||
                (props.showImageDescription && img.description)) && (
                <ImageListItemBar
                  position={
                    props.grid.positionTitle as "bottom" | "top" | "below"
                  }
                  sx={{
                    fontFamily: getFont(props.fontFamily as FontType),
                  }}
                  title={
                    props.showImageName
                      ? removeFileNameExtension(img.name as string)
                      : (img.description as string)
                  }
                  subtitle={
                    !props.showImageName
                      ? undefined
                      : props.showImageDescription && img.description
                      ? img.description
                      : undefined
                  }
                />
              )}
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open !== -1}
        onClose={() => setOpen(-1)}
        aria-labelledby="image-gallery-title"
        aria-describedby="image-gallery-description"
      >
        <Stack
          justifyContent="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 700,
            maxWidth: "100%",
            maxHeight: "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflow: "hidden",
            p: 1,
            borderRadius: 4,
          }}
        >
          <ImageCarousel
            startIndex={open}
            props={props.gallery}
            images={images}
            showImageName={props.showImageName}
            showImageDescription={props.showImageDescription}
          />
        </Stack>
      </Modal>
    </>
  );
}
