import { DisplayConfig } from "../../types";
import { Stack, Typography } from "@mui/material";
import { FontType, getFont } from "../fonts";
import Image from "next/image";
import { driveImageURL } from "../../functions";
import { SkeletonTitle } from "../skeleton";

interface TitleHeaderProps {
  dir: gapi.client.drive.File | null;
  props: DisplayConfig;
}

export default function TitleHeader({ dir, props }: TitleHeaderProps) {
  if (!dir && !props.logo) return;

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
      {dir ? (
        <>
          {dir.name && props.showTitle && (
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: "center",
                fontFamily: getFont(props.fontFamily as FontType),
              }}
            >
              {dir.name}
            </Typography>
          )}
          {dir.description && props.showDescription && (
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: getFont(props.fontFamily as FontType),
              }}
            >
              {dir.description}
            </Typography>
          )}
        </>
      ) : (
        <SkeletonTitle props={props} />
      )}
    </Stack>
  );
}
