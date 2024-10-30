"use client";

import CenterSpinner from "@/components/centerSpinner";
import {
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import Script from "next/script";
import { useEffect, useState } from "react";
import { gapiScriptLoad } from "ts-dom-libs/lib/google/functions";
import ImageListContainer from "./components/imageListContainer";
import { defaultDisplayProps, DisplayConfig } from "./types";

import SideMenu from "./components/sideMenu";

import {
  getConfigFile,
  makeLink,
  makePropsConfig,
  mergeProps,
} from "./functions";
import Link from "next/link";
import style from "@/lib/styles.module.css";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LinkIcon from "@mui/icons-material/Link";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { download_string_as_file } from "ts-dom-libs/lib/download";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const width = 300;

interface ApiState {
  api: boolean;
}

interface GDriveGalleryProps {
  id?: string;
  props?: DisplayConfig;
}

export default function GDriveGallery({
  props: initProps,
  id,
}: GDriveGalleryProps) {
  const [state, setState] = useState<ApiState>({
    api: false,
  });
  const [props, setProps] = useState<DisplayConfig>(
    id ? { ...(initProps ?? defaultDisplayProps), id } : defaultDisplayProps
  );
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!props.id || !state.api) return;
    getConfigFile(props.id)
      .then((p) => {
        if (p) setProps(mergeProps(p, defaultDisplayProps));
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        // console.error(e);
        console.warn("Error getting config");
      });
  }, [props.id, state.api]);

  return (
    <>
      <Drawer variant="persistent" open={open}>
        <Stack
          sx={{
            width,
            bgcolor: "rgb(245, 245, 245)",
            height: "100%",
          }}
        >
          <Stack direction="row" justifyContent="end" alignItems="center">
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
                href={makeLink(props)}
                target="_blank"
                style={{
                  display: "flex",
                }}
                className={style.removeLinkStyle}
              >
                <OpenInNewIcon />
              </Link>
            </Tooltip>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Stack>
          <Divider />
          <SideMenu props={props} setProps={setProps} />
        </Stack>
      </Drawer>
      <Stack
        sx={{
          flex: 1,
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        >
          <IconButton onClick={() => setOpen(true)} size="small">
            <MenuIcon />
          </IconButton>
          {state.api ? (
            <Tooltip title="Loaded">
              <CheckIcon fontSize="small" />
            </Tooltip>
          ) : (
            <Tooltip title="Loading...">
              <CircularProgress size="15px" />
            </Tooltip>
          )}
        </Stack>
        {state.api ? <ImageListContainer props={props} /> : <CenterSpinner />}
      </Stack>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          if (gapi.client?.drive) {
            setState({ api: true });
            return;
          }
          gapiScriptLoad(
            process.env.NEXT_PUBLIC_apiKey as string,
            discoveryDocs,
            () => {
              if (id) {
                getConfigFile(id)
                  .then((res) => {
                    if (res) setProps(mergeProps(res, props));
                  })
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  .catch((e) => {
                    console.warn("Error getting config");
                  })
                  .finally(() => {
                    setState({ api: true });
                  });
              } else setState({ api: true });
            }
          );
        }}
        // onReady={() => {
        //   if (gapi.client?.drive) setState({ api: true });
        // }}
      />
    </>
  );
}
