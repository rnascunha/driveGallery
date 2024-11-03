import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { download_string_as_file } from "ts-dom-libs/lib/download";
import {
  makeLink,
  makePropsConfig,
  mergeProps,
  uploadConfig,
} from "../../functions";
import Link from "next/link";
import { DisplayConfig, Status } from "../../types";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import { filePicker } from "ts-dom-libs/lib/files/openFile";
import { readFileAsString } from "@/lib/file";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";
import { signIn, signOut } from "ts-dom-libs/lib/google/functions";

import style from "@/lib/styles.module.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LinkIcon from "@mui/icons-material/Link";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

async function loadJSONFileConfig() {
  const fileList = await filePicker("application/json");
  if (!fileList || fileList.length === 0) return;
  const file = fileList.item(0);
  if (!file) return;
  if (file.type !== "application/json") throw new Error("Wrong Type");

  const data = await readFileAsString(file);
  const config = JSON.parse(data);
  if (typeof config !== "object") throw new Error("Wrong Data");

  return config;
}

interface TopMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  state: GoogleAPIState;
  setState: Dispatch<SetStateAction<GoogleAPIState>>;
  token: google.accounts.oauth2.TokenClient | null;
  onSignOut: () => void;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  configId: MutableRefObject<string | undefined>;
}

export default function TopMenu({
  props,
  setProps,
  setOpen,
  state,
  token,
  onSignOut,
  setStatus,
  configId,
}: TopMenuProps) {
  const [updating, setUpdating] = useState(false);

  const updateConfigData = () => {
    setUpdating(true);
    uploadConfig(props, configId.current)
      .then((res) => {
        if (!("error" in res)) {
          configId.current = res.id as string;
          setStatus({
            severity: "success",
            message: `Configuration saved! ${res.id as string}`,
          });
        } else {
          setStatus({
            severity: "error",
            message: `Error saving! ${res.error.message}`,
          });
        }
      })
      .catch((e) => {
        console.error("error", e);
        setStatus({
          severity: "error",
          message: `Error! ${e.message as string}`,
        });
      })
      .finally(() => setUpdating(false));
  };

  return (
    <Stack direction="row" justifyContent="end" alignItems="center">
      <Tooltip title="Login">
        <span>
          <IconButton
            disabled={!state.gsi || !token || state.signed}
            onClick={() => signIn(token as google.accounts.oauth2.TokenClient)}
          >
            <AddToDriveIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Logout">
        <span>
          <IconButton
            disabled={!state.signed}
            onClick={() => signOut(onSignOut)}
          >
            <LogoutIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Divider orientation="vertical" />
      <Tooltip title="Load configuration">
        <IconButton
          onClick={async () => {
            try {
              const config = await loadJSONFileConfig();
              setProps(mergeProps(config, props));
            } catch (e) {
              console.error(e);
            }
          }}
          edge="end"
        >
          <UploadFileIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download configuration">
        <IconButton
          edge="end"
          onClick={() =>
            download_string_as_file(
              JSON.stringify(makePropsConfig(props)),
              "config.json",
              "application/json"
            )
          }
        >
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Update configuration">
        <div style={{
          height: "40px",
          width: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {!updating ? (
            <IconButton
              disabled={!state.signed}
              sx={{
                mr: 0.3,
              }}
              edge="end"
              onClick={updateConfigData}
            >
              <CloudUploadIcon />
            </IconButton>
          ) : (
            <CircularProgress size={25} />
          )}
        </div>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" />
      <Tooltip title="Copy link">
        <span>
          <IconButton
            onClick={() => navigator.clipboard.writeText(makeLink(props))}
            disabled={props.id === ""}
          >
            <LinkIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Open view">
        <Link
          href={props.id ? makeLink(props) : ""}
          aria-disabled={props.id === ""}
          tabIndex={props.id === "" ? -1 : undefined}
          target="_blank"
          style={{
            display: "flex",
            pointerEvents: props.id === "" ? "none" : "auto",
            opacity: props.id === "" ? 0.3 : 1,
            color: "rgba(0, 0, 0, 0.54)",
            padding: "8px",
          }}
          className={style.removeLinkStyle}
        >
          <OpenInNewIcon />
        </Link>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" />
      <IconButton onClick={() => setOpen(false)}>
        <ChevronLeftIcon />
      </IconButton>
    </Stack>
  );
}
