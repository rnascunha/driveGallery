import { IconButton, SxProps } from "@mui/material";

import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";

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

export default function ToggleDescritopnButton({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton size="large" sx={buttonStyle} disableRipple onClick={onClick}>
      {show ? (
        <SpeakerNotesIcon sx={iconStyle} />
      ) : (
        <SpeakerNotesOffIcon sx={iconStyle} />
      )}
    </IconButton>
  );
}
