import { Dispatch, SetStateAction, useMemo } from "react";
import { DisplayConfig } from "../../types";
import { Stack, TextField } from "@mui/material";
import SimpleSelect from "@/components/simpleSelect";
import { debounce } from "ts-dom-libs/lib/debounce";
import { fontFamily } from "../fonts";
import { SwitchLabel } from "../../../../components/switch";
import { urlToId } from "@/lib/google/driveUtils";

interface HeaderMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function HeaderMenu({ props, setProps }: HeaderMenuProps) {
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
    <>
      <TextField
        label="Logo"
        size="small"
        value={props.logo}
        onChange={(ev) =>
          setProps((prev) => ({
            ...prev,
            logo: urlToId(ev.target.value),
          }))
        }
      />
      <Stack direction="row" gap={0.5}>
        <SimpleSelect
          label="Font Family"
          options={Object.keys(fontFamily)}
          value={props.fontFamily}
          onChange={(ev) =>
            setProps((prev) => ({
              ...prev,
              fontFamily: ev.target.value,
            }))
          }
          sx={{
            flex: 1,
          }}
        />
        <TextField
          label="Color"
          type="color"
          size="small"
          value={props.color}
          onChange={(ev) => colorBgChange(ev.target.value, "color")}
          sx={{
            flex: 0.5,
          }}
        />
      </Stack>
      <Stack>
        <SwitchLabel
          label="Title"
          checked={props.showTitle}
          onChange={(ev, checked) => {
            setProps((prev) => ({ ...prev, showTitle: checked }));
          }}
        />
        <SwitchLabel
          label="Description"
          checked={props.showDescription}
          onChange={(ev, checked) => {
            setProps((prev) => ({ ...prev, showDescription: checked }));
          }}
        />
      </Stack>
    </>
  );
}
