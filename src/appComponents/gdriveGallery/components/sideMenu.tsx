import { Divider, Drawer, Stack } from "@mui/material";
import { DisplayConfig, Force, Status } from "../types";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

// import SearchFolder from "./sideMenu/searchFolder";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";
import InputId from "./sideMenu/inputId";

import FileManagement from "./sideMenu/fileManagementMenu";
import ConfigMenu from "./sideMenu/configMenu";
import TopMenu from "./sideMenu/topMenu";

const width = 300;

interface SideMenuProps {
  dir: gapi.client.drive.File | null;
  setDir: Dispatch<SetStateAction<gapi.client.drive.File | null>>;
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  state: GoogleAPIState;
  setState: Dispatch<SetStateAction<GoogleAPIState>>;
  token: MutableRefObject<google.accounts.oauth2.TokenClient | null>;
  configId: MutableRefObject<string | undefined>;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  images: gapi.client.drive.File[] | undefined;
  setImages: Dispatch<SetStateAction<gapi.client.drive.File[] | undefined>>;
  setForce: Dispatch<SetStateAction<Force>>;
  error: string | null;
}

export default function SideMenu({
  dir,
  setDir,
  props,
  setProps,
  open,
  setOpen,
  state,
  setState,
  token,
  configId,
  setStatus,
  images,
  setImages,
  setForce,
  error,
}: SideMenuProps) {
  return (
    <Drawer variant="persistent" open={open}>
      <Stack
        sx={{
          width,
          bgcolor: "rgb(245, 245, 245)",
          height: "100%",
          px: 0.5,
        }}
      >
        <TopMenu
          dir={dir}
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
        <FileManagement
          dir={dir}
          setDir={setDir}
          state={state}
          images={images}
          setImages={setImages}
          setForce={setForce}
          setProps={setProps}
          error={error}
        />
        <InputId dir={dir} setDir={setDir} />
        {/* {state.signed ? (
        <SearchFolder dir={dir} setDir={setDir} />
      ) : (
        <InputId dir={dir} setDir={setDir} />
      )} */}
        <ConfigMenu props={props} setProps={setProps} />
      </Stack>
    </Drawer>
  );
}
