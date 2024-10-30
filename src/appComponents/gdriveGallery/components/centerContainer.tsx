import { Container } from "@mui/material";
import React, { ReactNode } from "react";

interface CenterContainerProps {
  maxWidth: number;
  children: ReactNode;
}

export default function CenterContainer({
  maxWidth,
  children,
}: CenterContainerProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100%",
        maxWidth: maxWidth === 0 ? "100%" : `${maxWidth}px`,
      }}
    >
      {children}
    </Container>
  );
}
