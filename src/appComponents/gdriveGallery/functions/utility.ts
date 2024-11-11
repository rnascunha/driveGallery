
export function isLink(url: string) {
  return /^https?:\/\//.test(url);
}

export function removeFileNameExtension(file: string) {
  return file.replace(/\..*$/, "");
}