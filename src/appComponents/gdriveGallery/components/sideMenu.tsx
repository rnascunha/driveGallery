import { Stack, TextField, Tooltip } from "@mui/material";
import { DisplayConfig } from "../types";
import { Dispatch, SetStateAction } from "react";
import GridMenu from "./sideMenu/grid";
import GalleryMenu from "./sideMenu/gallery";
import { ArrayPanel, PanelConfig } from "@/components/panels";

import WebAssetIcon from "@mui/icons-material/WebAsset";
import AppsIcon from "@mui/icons-material/Apps";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import TitleIcon from "@mui/icons-material/Title";
import GeneralMenu from "./sideMenu/general";
import HeaderMenu from "./sideMenu/header";

interface SideMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function SideMenu({ props, setProps }: SideMenuProps) {
  const panels: PanelConfig[] = [
    {
      label: (
        <Tooltip title="General">
          <WebAssetIcon />
        </Tooltip>
      ),
      panel: <GeneralMenu props={props} setProps={setProps} />,
    },
    {
      label: (
        <Tooltip title="Header">
          <TitleIcon />
        </Tooltip>
      ),
      panel: <HeaderMenu props={props} setProps={setProps} />,
    },
    {
      label: (
        <Tooltip title="Grid">
          <AppsIcon />
        </Tooltip>
      ),
      panel: <GridMenu props={props} setProps={setProps} />,
    },
    {
      label: (
        <Tooltip title="Gallery">
          <ViewCarouselIcon />
        </Tooltip>
      ),
      panel: <GalleryMenu props={props} setProps={setProps} />,
    },
  ];

  return (
    <Stack
      sx={{
        flex: 1,
        p: 0.5,
      }}
      gap={1}
    >
      <TextField
        label="ID"
        value={props.id}
        size="small"
        fullWidth
        onChange={(ev) => {
          const id = ev.target.value.startsWith("https://")
            ? ev.target.value.replace(/.*\/([a-zA-Z0-9-_]+)\??.*$/, "$1")
            : ev.target.value;
          setProps((prev) => ({ ...prev, id }));
        }}
      />
      <ArrayPanel
        panels={panels}
        sxHeader={{
          "& .MuiButtonBase-root": {
            minWidth: "unset",
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
          }
        }}
      />
    </Stack>
  );
}
