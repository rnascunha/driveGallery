import { Stack, TextField } from "@mui/material";
import {
  DisplayConfig,
  GalleryProps,
  heightUnits,
  objectFit,
  ObjectFit,
  thumbnailsPositions,
} from "../../types";
import { Dispatch, SetStateAction } from "react";
import SimpleSelect from "@/components/simpleSelect";
import CompactCheckbox from "@/components/compactCheckbox";
import { SwitchLabel } from "@/components/switch";
import InputUnit from "@/components/inputUnit";

interface GalleryMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function GalleryMenu({ props, setProps }: GalleryMenuProps) {
  const updateValue = <T,>(field: keyof GalleryProps, value: T) => {
    setProps((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        [field]: value,
      },
    }));
  };

  return (
    <Stack>
      <SwitchLabel
        label="Bullets"
        checked={props.gallery.showBullets}
        onChange={(ev, ck) => updateValue("showBullets", ck)}
      />
      <SwitchLabel
        label="Infinite"
        checked={props.gallery.infinite}
        onChange={(ev, ck) => updateValue("infinite", ck)}
      />
      <SwitchLabel
        label="FullScreen"
        checked={props.gallery.showFullscreenButton}
        onChange={(ev, ck) => updateValue("showFullscreenButton", ck)}
      />
      <SwitchLabel
        label="Navigation"
        checked={props.gallery.showNav}
        onChange={(ev, ck) => updateValue("showNav", ck)}
      />
      <SwitchLabel
        label="Index"
        checked={props.gallery.showIndex}
        onChange={(ev, ck) => updateValue("showIndex", ck)}
      />
      <SwitchLabel
        label="Play"
        checked={props.gallery.showPlay}
        onChange={(ev, ck) => updateValue("showPlay", ck)}
      />
      <SwitchLabel
        label="Toggle description"
        checked={props.gallery.showToggleDescritopn}
        onChange={(ev, ck) => updateValue("showToggleDescritopn", ck)}
      />
      <Stack gap={1}>
        <Stack direction="row" gap={0.5}>
          <CompactCheckbox
            label="Auto Play"
            checked={props.gallery.autoPlay}
            onChange={(ck) => updateValue("autoPlay", ck)}
          />
          <TextField
            label="Transition (ms)"
            value={props.gallery.slideDuration}
            size="small"
            type="number"
            onChange={(ev) => updateValue("slideDuration", +ev.target.value)}
            sx={{
              flex: 1,
            }}
          />
          <TextField
            label="Interval (ms)"
            value={props.gallery.slideInterval}
            size="small"
            type="number"
            onChange={(ev) => updateValue("slideInterval", +ev.target.value)}
            sx={{
              flex: 1,
            }}
          />
        </Stack>
        <SimpleSelect
          value={props.gallery.thumbnailsPosition}
          options={thumbnailsPositions}
          label="Thumbnail"
          onChange={(ev) => updateValue("thumbnailsPosition", ev.target.value)}
          sx={{
            flex: 1,
          }}
        />
        <Stack direction="row" gap={0.5}>
          <SimpleSelect
            label="Image Fit"
            value={props.gallery.objectFit}
            onChange={(ev) =>
              updateValue("objectFit", ev.target.value as ObjectFit)
            }
            options={objectFit}
            sx={{
              width: "11ch",
            }}
          />
          <InputUnit
            label="Height"
            value={props.gallery.height}
            unitOptions={heightUnits}
            onChange={(val) => updateValue("height", val)}
            min={10}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
