import {
  createFolder,
  setPermissionToAnyoneCanRead,
  updateFileMetadata,
} from "@/lib/google/drive";
import {
  Button,
  CircularProgress,
  Stack,
  StackProps,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, forwardRef, SetStateAction, useMemo, useState } from "react";
import ImageListManagement from "./imageListManagement";

interface FolderManagementProps extends StackProps {
  dire: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
  close: () => void;
  images: gapi.client.drive.File[] | undefined;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
  error: string | null;
}

const FolderManagement = forwardRef<HTMLDivElement, FolderManagementProps>(
  (props, ref) => {
    const {
      dire: dir,
      setDir,
      close,
      images,
      setImages,
      error: errorImage,
      ...others
    } = props;

    const [name, setName] = useState(dir?.name ?? "");
    const [description, setDescription] = useState(dir?.description ?? "");
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    const onClick = (
      dir: gapi.client.drive.File | null,
      name: string,
      description: string
    ) => {
      setError("");
      setUpdating(true);
      if (dir) {
        updateFileMetadata(
          dir.id as string,
          {
            name,
            description,
          },
          ["id", "name", "description", "mimeType"]
        )
          .then((f) => setDir(f.result))
          .catch((e) => setError(e.result.error.message))
          .finally(() => setUpdating(false));
      } else {
        createFolder({ name, description }, [
          "id",
          "name",
          "description",
          "mimeType",
        ])
          .then((f) =>
            Promise.all([
              f,
              setPermissionToAnyoneCanRead(f.result.id as string),
            ])
          )
          .then((p) => {
            setDir(p[0].result);
            setUpdating(false);
          })
          .catch((e) => {
            console.error(e);
            setError(e.result.error.message);
            setUpdating(false);
          });
      }
    };

    const imagesList = useMemo(() => {
      return dir && (
        <ImageListManagement
          images={images}
          setImages={setImages}
          error={errorImage}
        />
      );
    }, [dir, images, errorImage, setImages]);

    return (
      <Stack {...others} gap={1} ref={ref}>
        <Typography
          component="h3"
          variant="h4"
          sx={{
            textAlign: "center",
          }}
        >
          {dir ? "Update Folder" : "Create Folder"}
        </Typography>
        <Stack direction="row" gap={0.5}>
          <TextField
            label="Name"
            value={name}
            size="small"
            onChange={(ev) => setName(ev.target.value)}
            sx={{
              flex: 1,
            }}
          />
          {dir && (
            <TextField
              label="ID"
              disabled
              defaultValue={dir.id}
              size="small"
              sx={{
                width: "36ch",
              }}
            />
          )}
        </Stack>
        <TextField
          label="Description"
          value={description}
          multiline
          fullWidth
          rows="3"
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "red",
              fontSize: "small",
              flex: 1,
            }}
          >
            {error}
          </Typography>
          <Stack direction="row">
            <Button onClick={close}>Cancel</Button>
            <Button
              variant="contained"
              disabled={
                updating ||
                (dir === null && name === "") ||
                (dir !== null &&
                  name === dir.name &&
                  description === dir.description)
              }
              onClick={() => onClick(dir, name, description)}
            >
              <>
                {dir ? "Update" : "Create"}
                {updating && <CircularProgress size={15} sx={{ ml: 0.5 }} />}
              </>
            </Button>
          </Stack>
        </Stack>
        {imagesList}
      </Stack>
    );
  }
);

FolderManagement.displayName = "FolderManagement";

export default FolderManagement;
