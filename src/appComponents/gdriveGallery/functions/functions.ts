import {
  copyFile,
  createFile,
  createLink,
  deleteAllFilesByNameAtFolder,
  updateFileContent,
} from "@/lib/google/drive";
import { DisplayConfig } from "../types";
import { TextConfig } from "../components/sideMenu/inputFont";
import { configFileName } from "../constants";

const base = `${process.env.NEXT_PUBLIC_gallery_address}`;

export function makePropsConfig(props: DisplayConfig) {
  const data = Object.assign({}, props) as Partial<DisplayConfig>;
  return data;
}

export function makeLink(id: string) {
  return `${base}/${id}`;
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
    fullHeight: {
      ...secondary.fullHeight,
      ...primary.fullHeight,
    },
  };
}

export function makeStyle(
  props: TextConfig,
  defaultFontFamilty: string
): Omit<Partial<TextConfig>, "visibility"> {
  const a: Partial<TextConfig> = Object.assign({}, props);
  delete a.visibility;
  a.fontFamily = a.fontFamily === "default" ? defaultFontFamilty : a.fontFamily;
  return a;
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
      fields: "id, mimeType, shortcutDetails",
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
  id: string,
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
    parents: [id],
  };

  const resp = await createFile(metadata, body);
  return resp;
}

export async function listFiles(id: string) {
  return gapi.client.drive.files
    .list({
      pageSize: 100,
      fields: "files(id, name, description)",
      q: `('${id}' in parents) and trashed = false and (mimeType contains 'image/')`,
      spaces: "drive",
      orderBy: "name_natural",
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log("e1", e);
    });
}

export async function copyConfigFile(
  originalFile: gapi.client.drive.File,
  destinationId: string
) {
  return await Promise.all([
    deleteAllFilesByNameAtFolder(configFileName, destinationId),
    copyFile(originalFile.id as string, destinationId),
  ]);
}

export async function linkConfigFile(
  originalFile: gapi.client.drive.File,
  destinationId: string
) {
  return await Promise.all([
    deleteAllFilesByNameAtFolder(configFileName, destinationId),
    createLink(originalFile, {
      name: configFileName,
      parents: [destinationId],
    }),
  ]);
}

export async function loadConfigFile(id: string) {
  const file = await gapi.client.drive.files.get({
    fileId: id,
    alt: "media",
  });
  return file.result as unknown as DisplayConfig;
}
