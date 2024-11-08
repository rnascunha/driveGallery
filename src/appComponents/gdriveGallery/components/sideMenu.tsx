import { Stack, Tooltip } from "@mui/material";
import { DisplayConfig } from "../types";
import { Dispatch, SetStateAction } from "react";
import GridMenu from "./sideMenu/grid";
import GalleryMenu from "./sideMenu/gallery";
import { ArrayPanel, PanelConfig } from "@/components/panels";

import GeneralMenu from "./sideMenu/general";

// import SearchFolder from "./sideMenu/searchFolder";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";
import InputId from "./sideMenu/inputId";

import WebAssetIcon from "@mui/icons-material/WebAsset";
import AppsIcon from "@mui/icons-material/Apps";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import HeightIcon from "@mui/icons-material/Height";
import FullHeightMenu from "./sideMenu/fullHeight";

interface SideMenuProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
  state: GoogleAPIState;
}

export default function SideMenu({
  dir,
  setDir,
  props,
  setProps,
}: // state,
SideMenuProps) {
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
    {
      label: (
        <Tooltip title="Full Height">
          <HeightIcon />
        </Tooltip>
      ),
      panel: <FullHeightMenu props={props} setProps={setProps} />,
    },
  ];

  return (
    <Stack
      sx={{
        flex: 1,
        p: 0.5,
        mt: 0.25,
      }}
      gap={1}
    >
      <InputId dir={dir} setDir={setDir} />
      {/* {state.signed ? (
        <SearchFolder dir={dir} setDir={setDir} />
      ) : (
        <InputId dir={dir} setDir={setDir} />
      )} */}
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
