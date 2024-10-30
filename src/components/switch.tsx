import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent } from "react";

export function SwitchLabel({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (ev: ChangeEvent, checked: boolean) => void;
}) {
  return (
    <FormControlLabel
      sx={{
        justifyContent: "space-between",
        ml: 0,
        mx: 0.5
      }}
      control={<Switch color="primary" checked={checked} onChange={onChange} />}
      label={label}
      labelPlacement="start"
    />
  );
}
