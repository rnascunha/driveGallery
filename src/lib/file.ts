export async function readFileAsString(file: FileList | File) {
  return new Promise<string>((resolve, reject) => {
    if (!FileReader) {
      reject(new Error("FileReader API not supported"));
      return;
    }

    const fr = new FileReader();
    fr.onload = function () {
      if (fr.result) resolve(fr.result as string);
      else reject(new Error("Error reading file"));
    };
    fr.onerror = function () {
      reject(fr.error);
    };
    fr.readAsText(file instanceof FileList ? file[0] : file);
  });
}
