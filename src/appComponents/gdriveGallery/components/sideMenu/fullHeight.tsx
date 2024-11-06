import { Stack, TextField } from "@mui/material";
import {
  borderRadiusUnits,
  DisplayConfig,
  FullHeightProps,
  objectFit,
  ObjectFit,
} from "../../types";
import { Dispatch, SetStateAction } from "react";
import SimpleSelect from "@/components/simpleSelect";
import CompactCheckbox from "@/components/compactCheckbox";
import { SwitchLabel } from "../../../../components/switch";
import { InputHeight } from "./inputHeight";
import InputUnit from "@/components/inputUnit";

interface FullHeightMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function FullHeightMenu({
  props,
  setProps,
}: FullHeightMenuProps) {
  const updateValue = <T,>(field: keyof FullHeightProps, value: T) => {
    setProps((prev) => ({
      ...prev,
      fullHeight: {
        ...prev.fullHeight,
        [field]: value,
      },
    }));
  };

  return (
    <Stack>
      <SwitchLabel
        label="Bullets"
        checked={props.fullHeight.showBullets}
        onChange={(ev, ck) => updateValue("showBullets", ck)}
      />
      <SwitchLabel
        label="Infinite"
        checked={props.fullHeight.infinite}
        onChange={(ev, ck) => updateValue("infinite", ck)}
      />
      <SwitchLabel
        label="FullScreen"
        checked={props.fullHeight.showFullscreenButton}
        onChange={(ev, ck) => updateValue("showFullscreenButton", ck)}
      />
      <SwitchLabel
        label="Navigation"
        checked={props.fullHeight.showNav}
        onChange={(ev, ck) => updateValue("showNav", ck)}
      />
      <SwitchLabel
        label="Index"
        checked={props.fullHeight.showIndex}
        onChange={(ev, ck) => updateValue("showIndex", ck)}
      />
      <SwitchLabel
        label="Play"
        checked={props.fullHeight.showPlay}
        onChange={(ev, ck) => updateValue("showPlay", ck)}
      />
      <SwitchLabel
        label="Toggle description"
        checked={props.fullHeight.showToggleDescritopn}
        onChange={(ev, ck) => updateValue("showToggleDescritopn", ck)}
      />
      <Stack gap={1}>
        <Stack direction="row" gap={0.5}>
          <CompactCheckbox
            label="Auto Play"
            checked={props.fullHeight.autoPlay}
            onChange={(ck) => updateValue("autoPlay", ck)}
          />
          <TextField
            label="Transition (ms)"
            value={props.fullHeight.slideDuration}
            size="small"
            type="number"
            onChange={(ev) => updateValue("slideDuration", +ev.target.value)}
            sx={{
              flex: 1,
            }}
          />
          <TextField
            label="Interval (ms)"
            value={props.fullHeight.slideInterval}
            size="small"
            type="number"
            onChange={(ev) => updateValue("slideInterval", +ev.target.value)}
            sx={{
              flex: 1,
            }}
          />
        </Stack>
        <Stack direction="row" gap={0.5}>
          <SimpleSelect
            label="Image Fit"
            value={props.fullHeight.objectFit}
            onChange={(ev) =>
              updateValue("objectFit", ev.target.value as ObjectFit)
            }
            options={objectFit}
            sx={{
              width: "11ch",
            }}
          />
          <InputHeight
            value={props.fullHeight.height}
            onChange={(val: string) => updateValue("height", val)}
          />
        </Stack>
        <InputUnit
          label="Border Radius"
          value={props.fullHeight.borderRadius}
          unitOptions={borderRadiusUnits}
          onChange={(val) => updateValue("borderRadius", val)}
          min={0}
        />
      </Stack>
    </Stack>
  );
}
