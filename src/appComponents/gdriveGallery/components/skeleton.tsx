import {
  ImageList,
  ImageListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { DisplayConfig } from "../types";
import CenterContainer from "@/components/centerContainer";
import ScrollContainer from "@/components/scrollContainer";

interface Props {
  props: DisplayConfig;
}

export function SkeletonTitle({ props }: Props) {
  return (
    <>
      {props.logo && (
        <Skeleton
          variant="rounded"
          sx={{
            mt: 1,
            heigth: "50px",
            width: "150px",
          }}
        />
      )}
      <Typography
        component="div"
        variant="h2"
        sx={{
          width: "300px",
        }}
      >
        <Skeleton />
      </Typography>
      <Skeleton
        sx={{
          width: "100%",
        }}
      />
      <Skeleton
        sx={{
          width: "100%",
        }}
      />
      <Skeleton
        sx={{
          width: "100%",
        }}
      />
    </>
  );
}

export function SkeletonGrid({ props }: Props) {
  return (
    <ImageList
      sx={{
        width: "100%",
        height: props.grid.variant === "masonry" ? "100%" : "auto",
        pb: "15px",
      }}
      variant={props.grid.variant}
      cols={props.grid.cols}
      rowHeight={props.grid.rowHeight}
      gap={props.grid.gap}
    >
      {Array(10)
        .fill(0)
        .map((v, i) => (
          <ImageListItem key={i}>
            <Skeleton
              component="div"
              variant="rounded"
              width="100%"
              height="100%"
            />
          </ImageListItem>
        ))}
    </ImageList>
  );
}

export function SkeletonGallery() {
  return (
    <>
      <Skeleton variant="rounded" width="100%" height={500} />;
      <Stack
        direction="row"
        gap={1}
        sx={{
          height: "100px",
          overflowX: "auto",
        }}
      >
        {Array(10)
          .fill(0)
          .map((v, i) => (
            <Skeleton key={i} variant="rounded" height="100%" width={100} />
          ))}
      </Stack>
    </>
  );
}

export function SkeletonDriveGallery({ props }: Props) {
  return (
    <ScrollContainer>
      <CenterContainer maxWidth={props.maxWidth} sx={{
        overflow: "hidden"
      }}>
        <Stack alignItems="center" flex={1}>
          <SkeletonTitle props={props} />
          {props.type === "grid" ? (
            <SkeletonGrid props={props} />
          ) : (
            <SkeletonGallery />
          )}
        </Stack>
      </CenterContainer>
    </ScrollContainer>
  );
}
