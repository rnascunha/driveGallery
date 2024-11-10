import { Alert, Stack } from "@mui/material";
import { ReactNode } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import WarningIcon from "@mui/icons-material/Warning";

function StatusDisplay({ icon, info }: { icon?: ReactNode; info?: ReactNode }) {
  return (
    <Stack
      sx={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
      {info}
    </Stack>
  );
}

export function ImageListError({
  error,
  size = 30,
}: {
  error: string;
  size?: number;
}) {
  return (
    <StatusDisplay
      icon={
        <ErrorOutlineIcon
          sx={{
            fontSize: `${size}vh`,
          }}
        />
      }
      info={<Alert severity="error">{error}</Alert>}
    />
  );
}

export function EmptyFolder({ size = 30 }: { size?: number }) {
  return (
    <StatusDisplay
      icon={
        <WarningIcon
          sx={{
            fontSize: `${size}vh`,
          }}
        />
      }
      info={<Alert severity="warning">No images found</Alert>}
    />
  );
}

export function ImageListIdDefined({ size = 30 }: { size?: number }) {
  return (
    <StatusDisplay
      icon={
        <PriorityHighIcon
          sx={{
            fontSize: `${size}vh`,
          }}
        />
      }
      info={<Alert severity="info">No images directory set</Alert>}
    />
  );
}
