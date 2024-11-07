import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

interface MenuValue<T extends string | number> {
  value: T;
  label: T;
}

interface SimpleSelectProps<T extends string | number> {
  label: string;
  options: readonly (T | MenuValue<T>)[];
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
        {options.map((op) => {
          const o = typeof op === "object" ? op : { value: op, label: op };
          return (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
