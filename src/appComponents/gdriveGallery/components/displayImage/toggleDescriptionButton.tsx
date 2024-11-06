import { IconButton, SxProps } from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";

const buttonStyle: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  color: "#fff",
  filter: "drop-shadow(0 2px 2px #1a1a1a)",
  transition: "all .3s ease-out",
  outline: "none",
  p: "20px",
  "&:hover": {
    color: "#337ab7",
    transform: "scale(1.2)",
  },
};

const iconStyle: SxProps = {
  height: "28px",
  width: "28px",
};

export default function ToggleDescritopnButton({onClick}: {onClick: () => void}) {
  return (
    <IconButton
      size="large"
      sx={buttonStyle}
      disableRipple
      onClick={onClick}
    >
      <NotesIcon sx={iconStyle} />
    </IconButton>
  );
}
