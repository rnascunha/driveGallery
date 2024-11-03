import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { DisplayConfig } from "../types";
import { Dispatch, SetStateAction } from "react";
import GridMenu from "./sideMenu/grid";
import GalleryMenu from "./sideMenu/gallery";
import { ArrayPanel, PanelConfig } from "@/components/panels";

import GeneralMenu from "./sideMenu/general";
import HeaderMenu from "./sideMenu/header";

import WebAssetIcon from "@mui/icons-material/WebAsset";
import AppsIcon from "@mui/icons-material/Apps";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import TitleIcon from "@mui/icons-material/Title";
import SyncIcon from "@mui/icons-material/Sync";
// import SearchFolder from "./sideMenu/searchFolder";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";

interface SideMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
  state: GoogleAPIState;
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
      {/* <SearchFolder state={state} /> */}
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
        sx={{
          "& .MuiInputBase-root": {
            pr: 0.5,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  ml: 0,
                }}
              >
                <Tooltip title="Sync">
                  <IconButton
                    size="small"
                    edge="end"
                    onClick={() =>
                      setProps((prev) => ({ ...prev, force: !prev.force }))
                    }
                  >
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          },
        }}
      />
      <ArrayPanel
        panels={panels}
        sxHeader={{
          "& .MuiButtonBase-root": {
            minWidth: "unset",
            flex: 1,
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
          },
        }}
      />
    </Stack>
  );
}
