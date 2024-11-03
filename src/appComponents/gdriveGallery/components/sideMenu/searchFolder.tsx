import { TextField } from "@mui/material";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";

interface StateFolderProps {
  state: GoogleAPIState;
}

export default function SearchFolder({ state }: StateFolderProps) {
  return (
    <TextField label="Search" size="small" fullWidth disabled={!state.signed} />
  );
}
