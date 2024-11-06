export function driveImageThumbnailURL(id: string, width: number) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

export function driveImageURL(id: string) {
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

export function urlToId(url: string) {
  return url.startsWith("https://drive.google.com/file/d")
    ? url.replace(
        /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)\??.*$/,
        "$1"
      )
    : url;
}

export function urlFolderToId(url: string) {
  return url.replace(
    /https:\/\/drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)\/?.*$/,
    "$1"
  );
}

export function isDriveId(id: string) {
  return /^[a-zA-Z0-9_-]{33}$/.test(id);
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
