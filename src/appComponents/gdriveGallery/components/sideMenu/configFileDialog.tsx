import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Option } from "./fileManagementMenu";

interface ConfigFileDialodProps {
  open: boolean;
  selected: Option | undefined;
  onSelect: (opt: Option, file?: gapi.client.drive.File) => void;
  file?: gapi.client.drive.File;
}

export default function ConfigFileDialod({
  open,
  selected,
  onSelect,
  file,
}: ConfigFileDialodProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onSelect(Option.CANCEL)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Configuration File"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`File: ${file?.name}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSelect(Option.CANCEL)}>cancel</Button>
        <Button
          disabled={selected !== undefined}
          variant="contained"
          onClick={() => onSelect(Option.COPY, file)}
          endIcon={selected === Option.COPY && <CircularProgress size={15} />}
        >
          copy
        </Button>
        <Button
          disabled={selected !== undefined}
          variant="contained"
          onClick={() => onSelect(Option.LINK, file)}
          endIcon={selected === Option.LINK && <CircularProgress size={15} />}
        >
          link
        </Button>
        <Button
          disabled={selected !== undefined}
          variant="contained"
          onClick={() => onSelect(Option.LOAD, file)}
          endIcon={selected === Option.LOAD && <CircularProgress size={15} />}
        >
          load
        </Button>
      </DialogActions>
    </Dialog>
  );
}
