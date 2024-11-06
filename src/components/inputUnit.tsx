import {
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ChangeEvent } from "react";

interface SelectUnitProps<T extends string> {
  unit: T;
  unitOptions: readonly T[];
  onChangeUnit: (value: T, ev: SelectChangeEvent<T>) => void;
}

function SelectUnit<T extends string>({
  unit,
  unitOptions,
  onChangeUnit,
}: SelectUnitProps<T>) {
  return (
    <Select
      size="small"
      sx={{
        "& .MuiSvgIcon-root": {
          display: "none",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiInputBase-input.MuiOutlinedInput-input": {
          padding: 0,
          paddingRight: 0,
        },
      }}
      value={unit}
      onChange={(ev) => onChangeUnit(ev.target.value as T, ev)}
    >
      {unitOptions.map((u) => (
        <MenuItem key={u} value={u}>
          {u}
        </MenuItem>
      ))}
    </Select>
  );
}

export interface ValueUnit<T extends string> {
  value: number;
  unit: T;
}

interface InputUnitProps<T extends string>
  extends Omit<TextFieldProps<"standard">, "onChange" | "value"> {
  value: ValueUnit<T>;
  unitOptions: readonly T[];
  onChange: (
    val: ValueUnit<T>,
    ev:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<T>,
    kind: "value" | "unit"
  ) => void;
  min?: number;
  step?: number;
  max?: number;
}

export default function InputUnit<T extends string>(props: InputUnitProps<T>) {
  const {
    label,
    value,
    unitOptions,
    onChange,
    size,
    slotProps,
    min,
    step,
    max,
    ...others
  } = props;
  return (
    <TextField
      label={label}
      value={value.value}
      size={size ?? "small"}
      type="number"
      onChange={(ev) =>
        onChange({ value: +ev.target.value, unit: value.unit }, ev, "value")
      }
      slotProps={{
        htmlInput: {
          min,
          step,
          max,
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SelectUnit
                unit={value.unit}
                unitOptions={unitOptions}
                onChangeUnit={(val, ev) =>
                  onChange({ value: value.value, unit: val }, ev, "unit")
                }
              />
            </InputAdornment>
          ),
        },
        ...slotProps,
      }}
      {...others}
    />
  );
}
