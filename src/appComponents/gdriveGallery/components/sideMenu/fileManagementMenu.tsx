import { IconButton, Modal, Stack, Tooltip } from "@mui/material";

import { Dispatch, SetStateAction, useState } from "react";
import FolderManagement from "./folderManagement";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SyncIcon from "@mui/icons-material/Sync";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

interface FileManagementProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
  state: GoogleAPIState;
  images: gapi.client.drive.File[] | undefined;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
  setForce: Dispatch<SetStateAction<boolean>>;
  error: string | null;
}

export default function FileManagement({
  dir,
  setDir,
  state,
  images,
  setImages,
  setForce,
  error,
}: FileManagementProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack direction="row">
        <Tooltip title="Open folder">
          <span>
            <IconButton disabled={!state.signed} onClick={handleOpen}>
              <FolderOpenIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Sync folder">
          <span>
            <IconButton onClick={() => setForce((prev) => !prev)}>
              <SyncIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <FolderManagement
          dire={dir}
          setDir={setDir}
          close={handleClose}
          sx={{
            ...style,
            height: dir ? "80vh" : "auto",
          }}
          images={images}
          setImages={setImages}
          error={error}
        />
      </Modal>
    </>
  );
}
