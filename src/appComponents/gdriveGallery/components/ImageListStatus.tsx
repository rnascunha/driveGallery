import { Alert, Stack } from "@mui/material";
import { ReactNode } from "react";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

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

export function ImageListError({ error }: { error: string }) {
  return (
    <StatusDisplay
      icon={
        <ErrorOutlineIcon
          sx={{
            fontSize: "30vh",
          }}
        />
      }
      info={<Alert severity="error">{error}</Alert>}
    />
  );
}

export function ImageListIdDefined() {
  return <StatusDisplay
    icon={
      <PriorityHighIcon
        sx={{
          fontSize: "30vh",
        }}
      />
    }
    info={<Alert severity="info">No images directory set</Alert>}
  />;
}
