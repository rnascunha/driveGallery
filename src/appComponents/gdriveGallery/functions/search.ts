import {
  isDriveFolder,
  isDriveId,
  urlFolderToId,
} from "@/lib/google/driveUtils";

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
