import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface ScrollContainerProps {
  sx?: SxProps;
  children: ReactNode;
}

export default function ScrollContainer({sx, children }: ScrollContainerProps) {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto",
        ...sx
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
