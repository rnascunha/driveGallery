import { ArrayPanel, PanelConfig } from "@/components/panels";

import WebAssetIcon from "@mui/icons-material/WebAsset";
import AppsIcon from "@mui/icons-material/Apps";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import HeightIcon from "@mui/icons-material/Height";
import { Tooltip } from "@mui/material";
import GeneralMenu from "./general";
import GridMenu from "./grid";
import GalleryMenu from "./gallery";
import FullHeightMenu from "./fullHeight";
import { Dispatch, SetStateAction } from "react";
import { DisplayConfig } from "../../types";

interface ConfigMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function ConfigMenu({ props, setProps }: ConfigMenuProps) {
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
    <ArrayPanel
      panels={panels}
      sxHeader={{
        mb: 1,
        "& .MuiButtonBase-root": {
          minWidth: "unset",
          flex: 1,
        },
        "& .MuiTabs-flexContainer": {
          justifyContent: "space-between",
        },
      }}
    />
  );
}
