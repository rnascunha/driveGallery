import { IconButton, Menu } from "@mui/material";
import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextFormat from "./textFormat";
import { FontConfig } from "./types";

interface DrowdownTextFormatProps {
  format: FontConfig;
  onChange: (
    val: Partial<FontConfig>
  ) => void;
}

export default function DrowdownTextFormat({
  format,
  onChange,
}: DrowdownTextFormatProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        edge="end"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            style: {
              padding: 3,
            },
          },
        }}
      >
        <TextFormat format={format} onChange={onChange} />
      </Menu>
    </>
  );
}
