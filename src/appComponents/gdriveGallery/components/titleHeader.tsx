import { useEffect, useState } from "react";
import { DisplayConfig } from "../types";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { FontType, getFont } from "./fonts";
import Image from "next/image";
import { driveImageURL } from "../functions";

interface TitleData {
  title: string | undefined;
  description: string | undefined;
}

interface TitleHeaderProps {
  props: DisplayConfig;
}

export default function TitleHeader({ props }: TitleHeaderProps) {
  const [title, setTitle] = useState<TitleData | undefined | null>(undefined);

  useEffect(() => {
    gapi.client.drive.files
      .get({
        fileId: props.id,
        fields: "name, description",
      })
      .then((e) => {
        setTitle({ title: e.result.name, description: e.result.description });
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        setTitle(null);
      });
  }, [props.id]);

  if (title === null && props.logo === "") return;

  return (
    <Stack alignItems="center">
      {props.logo && (
        <div
          style={{
            position: "relative",
            height: "50px",
            width: "100%",
          }}
        >
          <Image
            alt={props.logo}
            src={driveImageURL(props.logo, 100)}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      )}
      {title ? (
        <>
          {title.title && props.showTitle && (
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: "center",
                fontFamily: getFont(props.fontFamily as FontType),
              }}
            >
              {title.title}
            </Typography>
          )}
          {title.description && props.showDescription && (
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: getFont(props.fontFamily as FontType),
              }}
            >
              {title.description}
            </Typography>
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}
