import { DisplayConfig } from "../../types";
import { Stack, Typography } from "@mui/material";
import { FontType, getFont } from "../fonts";
import Image from "next/image";
import { SkeletonTitle } from "../skeleton";
import { driveImageURL } from "@/lib/google/driveUtils";

function Logo({ props }: { props: DisplayConfig }) {
  return (
    props.logo && (
      <div
        style={{
          position: "relative",
          height: "50px",
          width: "100%",
        }}
      >
        <Image
          alt={props.logo}
          src={driveImageURL(props.logo)}
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    )
  );
}

interface TitleHeaderProps {
  dir: gapi.client.drive.File | null;
  props: DisplayConfig;
}

export default function TitleHeader({ dir, props }: TitleHeaderProps) {
  if (!dir && !props.logo) return;

  return (
    <Stack alignItems="center">
      <Logo props={props} />
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
        <SkeletonTitle />
      )}
    </Stack>
  );
}
