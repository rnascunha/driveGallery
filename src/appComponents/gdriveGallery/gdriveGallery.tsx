"use client";

import {
  Alert,
  AlertColor,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";

import ImageListContainer from "./components/imageListContainer";
import { defaultDisplayProps, DisplayConfig, Status } from "./types";

import TopMenu from "./components/sideMenu/topMenu";
import SideMenu from "./components/sideMenu";

import { getConfigFile, mergeProps } from "./functions";

import { SkeletonDriveGallery } from "./components/skeleton";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";
import { GoogleScriptsSpecifics } from "./components/google/googleSpecific";

import MenuIcon from "@mui/icons-material/Menu";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

const scopes = ["https://www.googleapis.com/auth/drive.file"];

const width = 300;

interface GDriveGalleryProps {
  id?: string;
  props?: DisplayConfig;
}

export default function GDriveGallery({
  props: initProps,
  id,
}: GDriveGalleryProps) {
  const [props, setProps] = useState<DisplayConfig>(
    id ? { ...(initProps ?? defaultDisplayProps), id } : defaultDisplayProps
  );
  const [open, setOpen] = useState(true);
  const [state, setState] = useState<GoogleAPIState>({
    api: false,
    gsi: false,
    signed: false,
  });
  const token = useRef<google.accounts.oauth2.TokenClient | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const configId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!props.id || !state.api) return;
    getConfigFile(props.id)
      .then((p) => {
        if (p) {
          configId.current = p[0];
          setProps({ ...mergeProps(p[1], defaultDisplayProps), id: props.id });
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        configId.current = undefined;
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
          <TopMenu
            props={props}
            setOpen={setOpen}
            setProps={setProps}
            state={state}
            setState={setState}
            token={token.current}
            onSignOut={() => setState((prev) => ({ ...prev, signed: false }))}
            setStatus={setStatus}
            configId={configId}
          />
          <Divider />
          <SideMenu props={props} setProps={setProps} state={state} />
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
        {state.api ? (
          <ImageListContainer props={props} />
        ) : (
          <SkeletonDriveGallery props={props} />
        )}
      </Stack>
      {status && (
        <Snackbar
          open={status !== null}
          autoHideDuration={6000}
          onClose={() => setStatus(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Alert
            severity={status.severity as AlertColor}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setStatus(null)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {status.message}
          </Alert>
        </Snackbar>
      )}
      <GoogleScriptsSpecifics
        setState={setState}
        setError={(e) => setStatus({ severity: "error", message: e })}
        scopes={scopes}
        discoveryDocs={discoveryDocs}
        token={token}
      />
    </>
  );
}
