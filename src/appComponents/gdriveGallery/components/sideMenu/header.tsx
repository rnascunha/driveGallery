import { Dispatch, SetStateAction } from "react";
import { DisplayConfig } from "../../types";
import { Stack, TextField } from "@mui/material";
import { urlToId } from "@/lib/google/driveUtils";
import InputFont from "./inputFont";

interface HeaderMenuProps {
  props: DisplayConfig;
  setProps: Dispatch<SetStateAction<DisplayConfig>>;
}

export default function HeaderMenu({ props, setProps }: HeaderMenuProps) {
  return (
    <>
      <TextField
        label="Logo"
        size="small"
        value={props.logo}
        onChange={(ev) =>
          setProps((prev) => ({
            ...prev,
            logo: urlToId(ev.target.value),
          }))
        }
      />
      <Stack>
        <InputFont
          label={"Title"}
          value={props.title}
          onChange={(val) =>
            setProps((prev) => ({
              ...prev,
              title: { ...prev.title, ...val },
            }))
          }
        />
        <InputFont
          label={"Description"}
          value={props.description}
          onChange={(val) =>
            setProps((prev) => ({
              ...prev,
              description: { ...prev.description, ...val },
            }))
          }
        />
      </Stack>
    </>
  );
}
