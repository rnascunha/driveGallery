import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { driveImageThumbnailURL } from "@/lib/google/driveUtils";
import {
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Image from "next/image";

import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import { updateFileMetadata } from "@/lib/google/drive";

enum State {
  NONE = 0,
  WORKING = 1,
  SUCCESS = 2,
  FAIL = 3,
}

const dim = 130;

type OpId = "save" | "delete";

function IconOp({
  icon,
  state,
  id,
  localId,
}: {
  icon: ReactNode;
  state: State;
  id: OpId;
  localId: OpId;
}) {
  if (id !== localId) return icon;
  if (state === State.WORKING) return <CircularProgress size={24} />;
  if (state === State.SUCCESS) return <DoneIcon />;
  if (state === State.FAIL) return <ErrorIcon />;
  return icon;
}

interface ImageManagementProps {
  image: gapi.client.drive.File;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
}

export default function ImageManagement({
  image,
  setImages,
}: ImageManagementProps) {
  const [op, setOp] = useState<{ id: OpId; state: State }>({
    state: State.NONE,
    id: "save",
  });
  const [name, setName] = useState(image.name);
  const [description, setDescription] = useState(image.description);

  const deleteImage = async () => {
    try {
      setOp({ id: "delete", state: State.WORKING });
      const res = await gapi.client.drive.files.delete({
        fileId: image.id as string,
      });
      if (res.status === 204) {
        setOp({ id: "delete", state: State.NONE });
        setImages((prev) => prev?.filter((i) => i.id !== image.id) ?? prev);
      } else setOp({ id: "delete", state: State.FAIL });
    } catch (e) {
      console.error(e);
      setOp({ id: "delete", state: State.FAIL });
    } finally {
      setTimeout(() => setOp({ id: "delete", state: State.NONE }), 1000);
    }
  };

  const saveImage = async () => {
    try {
      setOp({ id: "save", state: State.WORKING });
      const res = await updateFileMetadata(
        image.id as string,
        {
          name,
          description,
        },
        ["id", "name", "description", "mimeType"]
      );
      if (res.status === 200) {
        setOp({ id: "save", state: State.SUCCESS });
        setImages((prev) => {
          if (!prev) return;
          const idx = prev.findIndex((i) => i.id === image.id);
          if (idx === -1) return prev;
          return [...prev.slice(0, idx), res.result, ...prev.slice(idx + 1)];
        });
      } else setOp({ id: "save", state: State.FAIL });
    } catch (e) {
      console.error(e);
      setOp({ id: "save", state: State.FAIL });
    } finally {
      setTimeout(() => setOp({ id: "save", state: State.NONE }), 1000);
    }
  };

  return (
    <ListItem
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.3)",
        gap: 0.5,
      }}
    >
      <Box
        sx={{
          width: `${dim}px`,
          height: `${dim}px`,
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "5px",
        }}
      >
        <Image
          src={driveImageThumbnailURL(image.id as string, dim)}
          width={dim}
          height={dim}
          alt={image.name as string}
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
      <Stack gap={0.5} flex={1}>
        <TextField
          size="small"
          label="Name"
          value={name}
          fullWidth
          onChange={(ev) => setName(ev.target.value)}
        />
        <TextField
          size="small"
          label="Description"
          value={description}
          multiline
          rows={3}
          onChange={(ev) => setDescription(ev.target.value)}
          fullWidth
        />
      </Stack>
      <Stack justifyContent="center" alignItems="center">
        <Tooltip title="Save" placement="left">
          <span>
            <IconButton
              disabled={
                (name === image.name && description === image.description) ||
                op.state !== State.NONE
              }
              onClick={saveImage}
            >
              <IconOp
                icon={<SaveIcon />}
                state={op.state}
                localId="save"
                id={op.id}
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete" placement="left">
          <span>
            <IconButton
              disabled={op.state !== State.NONE}
              onClick={deleteImage}
            >
              <IconOp
                icon={<DeleteIcon />}
                state={op.state}
                localId="delete"
                id={op.id}
              />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </ListItem>
  );
}
