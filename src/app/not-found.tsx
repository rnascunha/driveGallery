import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import HouseIcon from "@mui/icons-material/House";

export default function NotFound() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      {/* <Link
        href="/g"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      > */}
        <HouseIcon
          fontSize="large"
          sx={{
            color: "text.primary",
          }}
        />
        <Typography
          sx={{
            color: "text.primary",
          }}
        >
          Return Home
        </Typography>
      {/* </Link> */}
    </Stack>
  );
}
