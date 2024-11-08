import { Dispatch, SetStateAction, useMemo } from "react";
import { DisplayConfig, DisplayType, displayTypes } from "../../types";
import { Divider, Stack, TextField, Tooltip } from "@mui/material";
import SimpleSelect from "@/components/simpleSelect";
import { debounce } from "ts-dom-libs/lib/debounce";
import InputFont from "./inputFont";
import ColorButton from "@/components/text/colorButton";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import HeaderMenu from "./header";
import { fontListOptions, fontsList } from "../../constants";

interface GeneralMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function GeneralMenu({ props, setProps }: GeneralMenuProps) {
  const colorBgChange = useMemo(() => {
    return debounce(
      (color: string) =>
        setProps((prev) => ({
          ...prev,
          backgroundColor: color,
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
            width: "10ch",
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
        <Tooltip title="Background color">
          <ColorButton
            value={props.backgroundColor}
            onChange={(color) => colorBgChange(color)}
            icon={
              <FormatColorFillIcon
                sx={{
                  color: "#000",
                  width: "40px",
                }}
              />
            }
          />
        </Tooltip>
      </Stack>
      <SimpleSelect
        label="Default font"
        options={fontsList}
        value={props.defaultFontFamilty}
        sx={{
          flex: 1,
          mt: 1,
        }}
        onChange={(ev) =>
          setProps((prev) => ({
            ...prev,
            defaultFontFamilty: ev.target.value,
          }))
        }
      />
      <Divider variant="middle">Header</Divider>
      <HeaderMenu props={props} setProps={setProps} />
      <Divider variant="middle">Image Caption</Divider>
      <InputFont
        label={"Name"}
        value={props.imageName}
        onChange={(val) =>
          setProps((prev) => ({
            ...prev,
            imageName: { ...prev.imageName, ...val },
          }))
        }
        fonts={fontListOptions}
      />
      <InputFont
        label={"Description"}
        value={props.imageDescription}
        onChange={(val) =>
          setProps((prev) => ({
            ...prev,
            imageDescription: {
              ...prev.imageDescription,
              ...val,
            },
          }))
        }
        fonts={fontListOptions}
      />
    </Stack>
  );
}
