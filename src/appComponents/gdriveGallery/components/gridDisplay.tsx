import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Modal,
  Stack,
} from "@mui/material";
import ScrollContainer from "@/components/scrollContainer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DisplayConfig } from "../types";
import CenterContainer from "./centerContainer";
import TitleHeader from "./titleHeader";
import ImageCarousel from "./imageCarousel";
import { FontType, getFont } from "./fonts";

import "./imgAnimation.css";

interface GridDisplayProps {
  props: DisplayConfig;
  images: gapi.client.drive.File[];
}

export default function GridDisplay({ props, images }: GridDisplayProps) {
  const [open, setOpen] = useState(-1);
  const ref = useRef<HTMLUListElement>(null);
  const [cols, setCols] = useState<number>(props.grid.cols);

  useEffect(() => {
    if (props.grid.columnType === "fixed") return;
    const calcCols = () => {
      if (!ref.current) return;
      const { width } = ref.current.getBoundingClientRect();
      setCols(Math.max(Math.floor(width / props.grid.colWidth), 1));
    };
    calcCols();
    window.addEventListener("resize", calcCols);
    return () => window.removeEventListener("resize", calcCols);
  }, [props.grid.columnType, props.grid.colWidth]);

  return (
    <>
      <ScrollContainer
        sx={{
          color: props.color,
          backgroundColor: props.backgroundColor,
        }}
      >
        <CenterContainer maxWidth={props.maxWidth}>
          {(props.showTitle || props.showDescription) && (
            <TitleHeader props={props} />
          )}
          <ImageList
            ref={ref}
            sx={{
              width: "100%",
              height: props.grid.variant === "masonry" ? "100%" : "auto",
            }}
            variant={props.grid.variant}
            cols={cols}
            rowHeight={props.grid.rowHeight}
            gap={props.grid.gap}
          >
            {images.map((img, i) => (
              <ImageListItem key={img.id}>
                <Image
                  // src={img.thumbnailLink as string}
                  src={`https://drive.google.com/thumbnail?id=${img.id}&sz=w500`}
                  sizes="100"
                  alt={img.name as string}
                  fill
                  priority
                  style={{
                    objectFit: props.grid.objectFit as "cover" | "contain",
                    cursor: "pointer",
                    borderRadius: `${props.grid.borderRadius}%`,
                    animation: "fadeIn 3s",
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
                          ? (img.name as string).replace(/\..*$/, "")
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
        </CenterContainer>
      </ScrollContainer>
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
