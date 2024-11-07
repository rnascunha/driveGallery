import {
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { MouseEvent, useMemo } from "react";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import { debounce } from "ts-dom-libs/lib/debounce";
import SimpleSelect from "../simpleSelect";
import { fontFamilyArray } from "./constants";
import { FontConfig } from "./types";

interface TextFormatProps {
  format: FontConfig;
  onChange: (
    val: Partial<FontConfig>
  ) => void;
}

export default function TextFormat({ format, onChange }: TextFormatProps) {
  const updateColor = useMemo(
    () => debounce((color: string) => onChange({ color: color }), 400),
    [onChange]
  );

  const handleFormat = (
    event: MouseEvent<HTMLElement>,
    newFormat: string[]
  ) => {
    onChange({
      fontWeight: newFormat.includes("bold") ? "bold" : "normal",
      fontStyle: newFormat.includes("italic") ? "italic" : "normal",
      textDecoration: newFormat.includes("underline") ? "underline" : "none",
    });
  };

  const makeValue = () => {
    const f = [];
    if (format.fontWeight === "bold") f.push("bold");
    if (format.fontStyle === "italic") f.push("italic");
    if (format.textDecoration === "underline") f.push("underline");
    return f;
  };

  return (
    <Stack direction="row" gap={0.2}>
      <SimpleSelect
        label="Font Family"
        options={fontFamilyArray}
        value={format.fontFamily}
        onChange={(ev) =>
          onChange({
            fontFamily: ev.target.value,
          })
        }
        sx={{
          width: "190px",
        }}
      />
      <ToggleButtonGroup
        size="small"
        value={makeValue()}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underline" aria-label="underline">
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        value="color"
        aria-label="color"
        sx={{
          p: 0,
          minWidth: 0,
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <label
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormatColorFillIcon
            sx={{
              color: format.color,
              width: "40px",
            }}
          />
          <input
            type="color"
            style={{
              width: 0,
              height: 0,
              border: "none",
            }}
            value={format.color}
            onChange={(ev) => updateColor(ev.target.value)}
          />
        </label>
      </Button>
      <TextField
        size="small"
        type="number"
        value={format.fontSize}
        sx={{
          width: "5ch",
          px: 0,
        }}
        slotProps={{
          htmlInput: {
            sx: {
              textAlign: "end",
              px: 0,
            },
          },
        }}
        onChange={(ev) => onChange({ fontSize: +ev.target.value })}
      />
    </Stack>
  );
}
