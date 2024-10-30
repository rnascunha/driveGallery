import { Checkbox, FormControlLabel } from "@mui/material";

export default function CompactCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <FormControlLabel
      sx={{
        mx: 1,
        "& .MuiButtonBase-root.MuiCheckbox-root": {
          p: 0,
        },
      }}
      control={
        <Checkbox
          size="small"
          checked={checked}
          onChange={(ev, checked) => onChange(checked)}
        />
      }
      label={label}
      labelPlacement="bottom"
    />
  );
}