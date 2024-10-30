import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

interface SimpleSelectProps<T extends number | string> {
  label: string;
  options: T[];
  value: T;
  fullWidth?: boolean;
  disabled?: boolean;
  onChange: (ev: SelectChangeEvent<T>) => void;
  sx?: SxProps;
}

export default function SimpleSelect<T extends number | string>({
  label,
  options,
  value,
  onChange,
  fullWidth,
  disabled,
  sx,
}: SimpleSelectProps<T>) {
  return (
    <FormControl fullWidth={fullWidth ?? false} sx={sx}>
      <InputLabel id={`${label.replace(" ", "-")}-label`}>{label}</InputLabel>
      <Select
        size="small"
        labelId={`${label.replace(" ", "-")}-label`}
        value={value}
        disabled={disabled ?? false}
        label={label}
        onChange={onChange}
      >
        {options.map((op) => (
          <MenuItem key={op} value={op}>
            {op}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
