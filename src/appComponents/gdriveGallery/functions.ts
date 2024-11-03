import { createFile, updateFileContent } from "@/lib/google/drive";
import { DisplayConfig } from "./types";

const base = `${process.env.NEXT_PUBLIC_gallery_address}`;

export function makePropsConfig(props: DisplayConfig) {
  const data = Object.assign({}, props) as Partial<DisplayConfig>;
  delete data.id;
  delete data.force;
  return data;
}

export function makeLink(props: DisplayConfig) {
  return `${base}/${props.id}`;
}

export function mergeProps(
  primary: Partial<DisplayConfig>,
  secondary: DisplayConfig
) {
  return {
    ...secondary,
    ...primary,
    gallery: {
      ...secondary.gallery,
      ...primary.gallery,
    },
    grid: {
      ...secondary.grid,
      ...primary.grid,
    },
  };
}

async function driveFollowLink(file: gapi.client.drive.File) {
  if (file.mimeType !== "application/vnd.google-apps.shortcut") return file.id;
  while (true) {
    if (
      file.shortcutDetails?.targetMimeType !==
      "application/vnd.google-apps.shortcut"
    )
      return file.shortcutDetails!.targetId;
    const rest = await gapi.client.drive.files.get({
      fileId: file.shortcutDetails!.targetId as string,
      fields: "files(id, mimeType, shortcutDetails)",
    });
    file = rest.result;
  }
}

export async function getConfigFile(id: string) {
  try {
    const rest = await gapi.client.drive.files.list({
      pageSize: 1,
      fields: "files(id, mimeType, shortcutDetails)",
      q: `('${id}' in parents) and trashed = false and name = 'config.json'`,
      spaces: "drive",
    });
    if (!rest.result.files?.length) return undefined;
    const fid = await driveFollowLink(rest.result!.files[0]);
    const file = await gapi.client.drive.files.get({
      fileId: fid as string,
      alt: "media",
    });
    return [fid, file.result] as [string, Partial<DisplayConfig>];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return undefined;
  }
}

export async function uploadConfig(
  props: DisplayConfig,
  fileId: string | undefined
) {
  const body = JSON.stringify(props);
  if (fileId) {
    return updateFileContent(fileId, body, "application/json");
  }
  const metadata = {
    name: "config.json",
    mimeType: "application/json",
    parents: [props.id],
  };

  const resp = await createFile(metadata, body);
  return resp;
}

export async function listFiles(id: string) {
  const token = gapi.client.getToken();
  gapi.client.setToken(null);
  return gapi.client.drive.files
    .list({
      pageSize: 100,
      fields: "files(id, name, description)",
      q: `('${id}' in parents) and trashed = false and (mimeType contains 'image/')`,
      spaces: "drive",
    })
    .then((res) => {
      gapi.client.setToken(token);
      return res;
    });
}

export function driveImageURL(id: string, width: number) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

export function urlToId(url: string) {
  return url.startsWith("https://drive.google.com/file/d")
    ? url.replace(
        /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)\??.*$/,
        "$1"
      )
    : url;
}

export function isLink(url: string) {
  return /^https?:\/\//.test(url);
}

export function isDriveLink(url: string) {
  return /^https:\/\/drive\.google\.com\//.test(url);
}

export function isDriveFolder(url: string) {
  return /^https:\/\/drive\.google\.com\/drive\/folders\//.test(url);
}

export function isDriveFile(url: string) {
  return /^https:\/\/drive\.google\.com\/file\/d\//.test(url);
}

export function removeFileNameExtension(file: string) {
  return file.replace(/\..*$/, "");
}
