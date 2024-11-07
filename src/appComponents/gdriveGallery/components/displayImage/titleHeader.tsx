import { DisplayConfig } from "../../types";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { SkeletonTitle } from "../skeleton";
import { driveImageThumbnailURL } from "@/lib/google/driveUtils";
import { makeStyle } from "../../functions";

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
          src={driveImageThumbnailURL(props.logo, 200)}
          fill
          sizes="200w"
          priority
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
          {dir.name && props.title.visibility && (
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: "center",
                whiteSpace: "break-spaces",
                ...makeStyle(props.title),
              }}
            >
              {dir.name}
            </Typography>
          )}
          {dir.description && props.description.visibility && (
            <Typography
              sx={{
                textAlign: "center",
                whiteSpace: "break-spaces",
                ...makeStyle(props.description),
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
