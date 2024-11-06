import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

type Unit = "px" | "vh";

function SelectHeightUnit({
  unit,
  updateValue,
}: {
  unit: Unit;
  updateValue: (value: Unit) => void;
}) {
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
      onChange={(ev) => updateValue(ev.target.value as Unit)}
    >
      <MenuItem value="px">px</MenuItem>
      <MenuItem value="vh">vh</MenuItem>
    </Select>
  );
}

function separeteFields(value: string) {
  return value.replace(/^([0-9]*)([a-zA-Z]*)/, "$1-$2").split("-");
}

interface InputHeightProps {
  value: string;
  onChange: (v: string) => void;
}

export function InputHeight({ value, onChange }: InputHeightProps) {
  const [v, un] = separeteFields(value);
  const [unit, setUnit] = useState<Unit>(un as Unit);

  return (
    <TextField
      label="Height"
      value={unit === 'vh' ? Math.min(100, +v) : +v}
      size="small"
      type="number"
      onChange={(ev) => onChange(`${+ev.target.value}${unit}`)}
      slotProps={{
        htmlInput: {
          min: 1,
          max: unit === 'vh' ? 100 : undefined
        },
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SelectHeightUnit
                unit={unit as Unit}
                updateValue={(u: Unit) => {
                  setUnit(u);
                  onChange(`${v}${u}`);
                }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        flex: 1,
      }}
    />
  );
}
