import { Dispatch, SetStateAction, useMemo } from "react";
import { DisplayConfig, DisplayType, displayTypes } from "../../types";
import { Stack, TextField } from "@mui/material";
import SimpleSelect from "@/components/simpleSelect";
import { debounce } from "ts-dom-libs/lib/debounce";
import { SwitchLabel } from "../../../../components/switch";

interface GeneralMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function GeneralMenu({ props, setProps }: GeneralMenuProps) {
  const colorBgChange = useMemo(() => {
    return debounce(
      (color: string, field: keyof DisplayConfig) =>
        setProps((prev) => ({
          ...prev,
          [field]: color,
        })),
      1000
    );
  }, [setProps]);

  return (
    <Stack>
      <Stack direction="row" gap={0.5}>
        <TextField
          label="Max Width"
          value={props.maxWidth}
          size="small"
          type="number"
          onChange={(ev) =>
            setProps((prev) => ({ ...prev, maxWidth: +ev.target.value }))
          }
          slotProps={{
            htmlInput: {
              min: 0,
            },
          }}
          sx={{
            flex: 1,
          }}
        />
        <SimpleSelect
          label="Display"
          options={displayTypes}
          value={props.type}
          sx={{
            flex: 1,
          }}
          onChange={(ev) =>
            setProps((prev) => ({
              ...prev,
              type: ev.target.value as DisplayType,
            }))
          }
        />
        <TextField
          label="Bg Color"
          type="color"
          size="small"
          value={props.backgroundColor}
          onChange={(ev) => colorBgChange(ev.target.value, "backgroundColor")}
          sx={{
            flex: 1,
          }}
        />
      </Stack>
      <SwitchLabel
        label="Image name"
        checked={props.showImageName}
        onChange={(ev, checked) => {
          setProps((prev) => ({
            ...prev,
            showImageName: checked,
          }));
        }}
      />
      <SwitchLabel
        label="Image description"
        checked={props.showImageDescription}
        onChange={(ev, checked) => {
          setProps((prev) => ({
            ...prev,
            showImageDescription: checked,
          }));
        }}
      />
    </Stack>
  );
}
