import { Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { download_string_as_file } from "ts-dom-libs/lib/download";
import { makeLink, makePropsConfig, mergeProps } from "../../functions";
import Link from "next/link";
import { DisplayConfig } from "../../types";
import { Dispatch, SetStateAction } from "react";

import style from "@/lib/styles.module.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LinkIcon from "@mui/icons-material/Link";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { filePicker } from "ts-dom-libs/lib/files/openFile";
import { readFileAsString } from "@/lib/file";

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
}

export default function TopMenu({ props, setProps, setOpen }: TopMenuProps) {
  return (
    <Stack direction="row" justifyContent="end" alignItems="center">
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
        >
          <UploadFileIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download configuration">
        <IconButton
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
            padding: "8px"
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
