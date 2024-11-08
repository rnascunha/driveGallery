import { createFile, updateFileContent } from "@/lib/google/drive";
import { DisplayConfig } from "./types";
import {
  isDriveFolder,
  isDriveId,
  urlFolderToId,
} from "@/lib/google/driveUtils";
import { TextConfig } from "./components/sideMenu/inputFont";

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

export function makeStyle(props: TextConfig, defaultFontFamilty: string): Omit<Partial<TextConfig>, "visibility"> {
  const a:Partial<TextConfig> = Object.assign({}, props);
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
  const token = gapi.client.getToken();
  gapi.client.setToken(null);
  return gapi.client.drive.files
    .list({
      pageSize: 100,
      fields: "files(id, name, description)",
      q: `('${id}' in parents) and trashed = false and (mimeType contains 'image/')`,
      spaces: "drive",
      orderBy: "name_natural"
    })
    .then((res) => {
      gapi.client.setToken(token);
      return res;
    })
}

export function isLink(url: string) {
  return /^https?:\/\//.test(url);
}

export function removeFileNameExtension(file: string) {
  return file.replace(/\..*$/, "");
}

async function searchByFolderLink(link: string) {
  return await gapi.client.drive.files
    .get({
      fileId: urlFolderToId(link),
      fields: "id, name, description",
    })
    .then((f) => {
      return f.result;
    })
    .catch((e) => {
      return { error: e, message: e.result.error.message };
    });
}

async function searchById(id: string) {
  return await gapi.client.drive.files
    .get({
      fileId: id,
      fields: "id, name, description, mimeType",
    })
    .then((f) => {
      if (f.result.mimeType !== "application/vnd.google-apps.folder")
        return { error: {}, message: "ID is not a directory!" };
      return f.result;
    })
    .catch((e) => {
      return { error: e, message: e.result.error.message };
    });
}

async function searchByName(name: string) {
  return await gapi.client.drive.files
    .list({
      fields: "files(id, name, description)",
      pageSize: 10,
      q: `name contains '${name}' and trashed = false and mimeType = 'application/vnd.google-apps.folder'`,
      spaces: "drive",
    })
    .then((f) => {
      return f.result.files ?? [];
    })
    .catch((e) => {
      return { error: e, message: e.result.error.message as string };
    });
}

type SearchResult =
  | { error: unknown; message: string }
  | gapi.client.drive.File[];

export async function searchFolderByNameOrId(
  idOrName: string
): Promise<SearchResult> {
  const token = gapi.client.getToken();
  gapi.client.setToken(null);
  if (isDriveFolder(idOrName)) {
    const ret = await searchByFolderLink(idOrName);
    gapi.client.setToken(token);
    return "error" in ret ? ret : [ret];
  } else if (isDriveId(idOrName)) {
    const ret = await searchById(idOrName);
    gapi.client.setToken(token);
    return "error" in ret ? ret : [ret];
  }

  gapi.client.setToken(token);
  const resp = await searchByName(idOrName);
  return resp;
}

export async function searchByFolderId(id: string) {
  const token = gapi.client.getToken();
  gapi.client.setToken(null);
  let ret = undefined;
  if (isDriveFolder(id)) {
    ret = await searchByFolderLink(id);
  } else if (isDriveId(id)) {
    ret = await searchById(id);
  }
  gapi.client.setToken(token);
  if (ret) return ret;
  return { error: {}, message: `Not a valid ID` };
}

