import {
  Divider,
  IconButton,
  Modal,
  Stack,
  Tooltip,
} from "@mui/material";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import FolderManagement from "./folderManagement";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";

import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SyncIcon from "@mui/icons-material/Sync";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloseIcon from "@mui/icons-material/Close";
import ConfigFileDialod from "./configFileDialog";
import {
  openSelectConfigPicker,
  openSelectFolderPicker,
} from "../../functions/openPicker";
import { DisplayConfig, Force } from "../../types";
import {
  copyConfigFile,
  linkConfigFile,
  loadConfigFile,
} from "../../functions/functions";

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

export enum Option {
  CANCEL = 0,
  COPY,
  LINK,
  LOAD,
}

interface FileManagementProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
  state: GoogleAPIState;
  images: gapi.client.drive.File[] | undefined;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
  setForce: Dispatch<SetStateAction<Force>>;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
  error: string | null;
}

export default function FileManagement({
  dir,
  setDir,
  state,
  images,
  setImages,
  setForce,
  setProps,
  error,
}: FileManagementProps) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>(undefined);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const file = useRef<gapi.client.drive.File>({});

  const onSelectConfig = async (opt: Option, file?: gapi.client.drive.File) => {
    if (opt === Option.CANCEL || file === undefined || !dir) return;
    setSelected(opt);
    switch (opt) {
      case Option.COPY:
        await copyConfigFile(file, dir.id as string);
        setForce((prev) => ({ ...prev, config: !prev.config }));
        break;
      case Option.LINK:
        await linkConfigFile(file, dir.id as string);
        setForce((prev) => ({ ...prev, config: !prev.config }));
        break;
      case Option.LOAD:
        const f = await loadConfigFile(file.id as string);
        setProps(f);
        break;
    }
    setSelected(undefined);
    setOpenDialog(false);
  };

  return (
    <>
      <Stack direction="row">
        <Tooltip title="Select folder">
          <span>
            <IconButton
              disabled={!state.signed}
              onClick={() => openSelectFolderPicker(setDir)}
            >
              <AddToDriveIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Manage folder">
          <span>
            <IconButton disabled={!state.signed} onClick={handleOpen}>
              <FolderOpenIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Load config">
          <span>
            <IconButton
              disabled={!state.signed}
              onClick={() =>
                openSelectConfigPicker((f) => {
                  file.current = f as gapi.client.drive.File;
                  setOpenDialog(true);
                })
              }
            >
              <CloudDownloadIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip title="Sync folder">
          <span>
            <IconButton
              onClick={() =>
                setForce((prev) => ({ ...prev, images: !prev.images }))
              }
            >
              <SyncIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Close folder">
          <span>
            <IconButton onClick={() => setDir(null)}>
              <CloseIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <ConfigFileDialod
        open={openDialog}
        selected={selected}
        onSelect={onSelectConfig}
        file={file.current}
      />
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
