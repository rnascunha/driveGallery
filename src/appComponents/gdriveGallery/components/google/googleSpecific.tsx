import { Dispatch, MutableRefObject, SetStateAction } from "react";

import GoogleLoadScripts from "./googleScripts";
import {
  gapiScriptLoad,
  gsiCallbackAllScopes,
  gsiScriptLoad,
} from "ts-dom-libs/lib/google/functions";
import { GoogleAPIState } from "ts-dom-libs/lib/google/types";

interface GoogleScriptsSpecificsProps {
  setState: Dispatch<SetStateAction<GoogleAPIState>>;
  setError?: (msg: string) => void;
  discoveryDocs: string[];
  scopes: readonly string[];
  token: MutableRefObject<google.accounts.oauth2.TokenClient | null>;
}

export function GoogleScriptsSpecifics({
  setState,
  setError,
  token,
  discoveryDocs,
  scopes,
}: GoogleScriptsSpecificsProps) {
  const gsiLoad = () =>
    gsiScriptLoad(
      process.env.NEXT_PUBLIC_client_id as string,
      scopes,
      (resp) => {
        gsiCallbackAllScopes(
          resp,
          scopes,
          () => setState((prev) => ({ ...prev, signed: true })),
          (error) => setError?.(error)
        );
      }
    );

  return (
    <GoogleLoadScripts
      gapiLoad={() =>
        gapiScriptLoad(
          process.env.NEXT_PUBLIC_apiKey as string,
          discoveryDocs,
          () => {
            gapi.load("client:picker", () =>
              setState((prev) => ({ ...prev, api: true }))
            );
          }
        )
      }
      gapiReady={() => {
        // guaranteed that the apis (client and drive) are loaded
        if (gapi.client?.drive) setState((prev) => ({ ...prev, api: true }));
      }}
      gsiLoad={() => {
        token.current = gsiLoad();
        setState((prev) => ({ ...prev, gsi: true }));
      }}
      gsiReady={() => {
        if (!token.current) token.current = gsiLoad();
        setState((prev) => ({ ...prev, gsi: true }));
      }}
    />
  );
}
