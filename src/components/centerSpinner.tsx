import { Box } from "@mui/material";
import Spinner from "./spinner/spinner";
import { CSSProperties } from "react";

export default function CenterSpinner({
  width = 150,
  height = 150,
  style,
}: {
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        fill: (theme) => theme.palette.text.primary,
        stroke: (theme) => theme.palette.text.primary,
      }}
    >
      <Spinner width={width} height={height} style={style} />
    </Box>
  );
}
