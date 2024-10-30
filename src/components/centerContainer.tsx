import { Container, SxProps } from "@mui/material";
import React, { ReactNode } from "react";

interface CenterContainerProps {
  maxWidth: number;
  children: ReactNode;
  sx?: SxProps;
}

export default function CenterContainer({
  maxWidth,
  children,
  sx,
}: CenterContainerProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100%",
        maxWidth: maxWidth === 0 ? "100%" : `${maxWidth}px`,
        ...sx
      }}
    >
      {children}
    </Container>
  );
}
