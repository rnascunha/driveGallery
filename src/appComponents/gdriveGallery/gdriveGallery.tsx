"use client";

import {
  Alert,
  AlertColor,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";

import { DisplayConfig, Force, Status } from "./types";

import SideMenu from "./components/sideMenu";

import { getConfigFile, listFiles, mergeProps } from "./functions/functions";

import { SkeletonDriveGallery } from "./components/skeleton";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";
import { GoogleScriptsSpecifics } from "./components/google/googleSpecific";

import MenuIcon from "@mui/icons-material/Menu";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { defaultDisplayProps, discoveryDocs, scopes } from "./constants";
import DisplayImageShow from "./components/displayImage/displayImageShow";

import "./global.css";

interface GDriveGalleryProps {
  id?: string;
  props?: DisplayConfig;
}

export default function GDriveGallery({
  props: initProps,
  id,
}: GDriveGalleryProps) {
  const [dir, setDir] = useState<gapi.client.drive.File | null>(null);
  const [props, setProps] = useState<DisplayConfig>(
    initProps ?? defaultDisplayProps
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
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<gapi.client.drive.File[] | undefined>(
    undefined
  );
  const [force, setForce] = useState<Force>({ images: false, config: false });

  useEffect(() => {
    if (!id) return;
    if (!state.api) return;
    gapi.client.drive.files
      .get({
        fileId: id,
        fields: "id, name, description, mimeType",
      })
      .then((f) => {
        if (f.result.mimeType !== "application/vnd.google-apps.folder") {
          setStatus({
            severity: "warning",
            message: `ID '${id}' is not a directory!`,
          });
          return;
        }
        setDir(f.result);
      })
      .catch((e) => {
        console.error(e);
        setStatus({ severity: "error", message: `Error requesting ID ${id}` });
      });
  }, [id, state.api]);

  useEffect(() => {
    if (!dir?.id || !state.api) return;
    configId.current = undefined;
    getConfigFile(dir.id)
      .then((p) => {
        if (p) {
          configId.current = p[0];
          setProps(mergeProps(p[1], defaultDisplayProps));
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        configId.current = undefined;
        console.warn("Error getting config");
      });
  }, [dir, state.api, force.config]);

  useEffect(() => {
    setError(null);
    if (!dir) return;

    listFiles(dir.id as string)
      .then((f) => {
        if (!f) return;
        setImages(f.result.files as gapi.client.drive.File[]);
      })
      .catch((e) => {
        setImages(undefined);
        setError(e.result.error.message);
      });
  }, [dir, force.images]);

  return (
    <>
      <SideMenu
        dir={dir}
        setDir={setDir}
        open={open}
        setOpen={setOpen}
        props={props}
        setProps={setProps}
        state={state}
        setState={setState}
        setStatus={setStatus}
        token={token}
        configId={configId}
        images={images}
        setImages={setImages}
        setForce={setForce}
        error={error}
      />
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
          <DisplayImageShow
            dir={dir}
            props={props}
            error={error}
            images={images}
          />
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
