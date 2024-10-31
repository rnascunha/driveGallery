import { Dispatch, SetStateAction } from "react";
import {
  ColumnType,
  DisplayConfig,
  GridProps,
  GridVariant,
  gridVariants,
  objectFit,
  ObjectFit,
  PositionTitle,
  positionTitles,
} from "../../types";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

function SelectColumnType({
  columnType,
  updateValue,
}: {
  columnType: ColumnType;
  updateValue: (value: ColumnType) => void;
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
      value={columnType}
      onChange={(ev) => updateValue(ev.target.value)}
    >
      <MenuItem value="fixed">cols</MenuItem>
      <MenuItem value="dinamic">px</MenuItem>
    </Select>
  );
}

interface GridMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function GridMenu({ props, setProps }: GridMenuProps) {
  const updateValue = <T,>(field: keyof GridProps, value: T) => {
    setProps((prev) => ({
      ...prev,
      grid: {
        ...prev.grid,
        [field]: value,
      },
    }));
  };

  return (
    <>
      <Stack direction="row" alignItems="center" gap={1.5}>
        <FormControl
          size="small"
          sx={{
            width: "11ch",
          }}
        >
          <InputLabel id="image-fit-label">Image Fit</InputLabel>
          <Select
            labelId="image-fit-label"
            id="image-fit"
            value={props.grid.objectFit}
            label="Image Fit"
            onChange={(ev) =>
              updateValue("objectFit", ev.target.value as ObjectFit)
            }
          >
            {objectFit.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title="Border Radius">
          <Slider
            aria-label="border-radius"
            // size="small"
            value={props.grid.borderRadius}
            onChange={(ev, value) =>
              updateValue("borderRadius", value as number)
            }
            getAriaValueText={(v) => `${v}%`}
            valueLabelDisplay="auto"
            min={0}
            max={50}
            step={1}
            sx={{
              flex: 1,
              mr: 1,
            }}
          />
        </Tooltip>
      </Stack>
      <Stack direction="row" gap={0.5}>
        <TextField
          label="Columns"
          value={
            props.grid.columnType === "fixed"
              ? props.grid.cols
              : props.grid.colWidth
          }
          size="small"
          type="number"
          onChange={(ev) =>
            updateValue(
              props.grid.columnType === "fixed" ? "cols" : "colWidth",
              +ev.target.value
            )
          }
          slotProps={{
            htmlInput: {
              min: props.grid.columnType === "fixed" ? 1 : 50,
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SelectColumnType
                    columnType={props.grid.columnType}
                    updateValue={(v: ColumnType) =>
                      updateValue("columnType", v)
                    }
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flex: 1,
          }}
        />
        <TextField
          label="Rows Height"
          value={props.grid.rowHeight}
          size="small"
          type="number"
          onChange={(ev) => updateValue("rowHeight", +ev.target.value)}
          slotProps={{
            htmlInput: {
              min: 30,
            },
          }}
          sx={{
            flex: 1,
          }}
        />
        <TextField
          label="Gap"
          value={props.grid.gap}
          size="small"
          type="number"
          onChange={(ev) => updateValue("gap", +ev.target.value)}
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
          sx={{
            width: "7ch",
          }}
        />
      </Stack>
      <Stack direction="row" gap={0.5}>
        <FormControl
          size="small"
          sx={{
            width: "11ch",
          }}
        >
          <InputLabel id="image-list-title-label">Title</InputLabel>
          <Select
            labelId="image-list-title-label"
            id="image-list-title"
            value={props.grid.positionTitle}
            label="Title"
            onChange={(ev) =>
              updateValue("positionTitle", ev.target.value as PositionTitle)
            }
          >
            {positionTitles.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          sx={{
            flex: 1,
          }}
        >
          <InputLabel id="image-list-variant-label">Variant</InputLabel>
          <Select
            labelId="image-list-variant-label"
            id="image-variant-type"
            value={props.grid.variant}
            label="Variant"
            onChange={(ev) =>
              updateValue("variant", ev.target.value as GridVariant)
            }
          >
            {gridVariants.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
