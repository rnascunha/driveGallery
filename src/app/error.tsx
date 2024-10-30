"use client";

import { useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {

    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography component="h2" variant="h4">
        Something went wrong!
      </Typography>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography>Try Again</Typography>
        <IconButton onClick={reset}>
          <RestartAltIcon />
        </IconButton>
      </Stack>
      <Accordion
        sx={{
          width: "50%",
          minWidth: "400px"
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <b>Error Details</b>
        </AccordionSummary>
        <AccordionDetails>
          <Box>{error.name}</Box>
          <Box>{error.message}</Box>
          {error.digest && <Box>Digest: {error.digest}</Box>}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
