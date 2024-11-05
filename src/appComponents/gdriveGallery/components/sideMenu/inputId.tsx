import { CircularProgress, TextField } from "@mui/material";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  isDriveFolder,
  isDriveId,
  searchByFolderId,
  urlFolderToId,
} from "../../functions";

interface InputIdProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
}

export default function InputId({ dir, setDir }: InputIdProps) {
  const [value, setValue] = useState(dir?.id ?? "");
  const [helperText, setHelperText] = useState(" ");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dir) return;
    if (dir.id !== value) setValue(dir.id as string);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir]);

  useEffect(() => {
    if (value === " ") {
      setHelperText(" ");
      return;
    }
    if (!isDriveId(value)) {
      setHelperText("Not a valid ID");
      return;
    }
    setLoading(true);
    searchByFolderId(value)
      .then((f) => {
        if ("error" in f) {
          setDir(null);
          setHelperText(f.message);
          return;
        }
        setHelperText(f.name as string);
        setDir(f);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, [value, setDir]);

  return (
    <TextField
      label="ID / Link"
      value={value}
      size="small"
      fullWidth
      helperText={helperText}
      onChange={(ev) =>
        setValue(
          isDriveFolder(ev.target.value)
            ? urlFolderToId(ev.target.value)
            : ev.target.value
        )
      }
      slotProps={{
        input: {
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
            </>
          ),
        },
      }}
    />
  );
}
