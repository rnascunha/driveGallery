export function openSelectFolderPicker(
  setDir: (folder: gapi.client.drive.File) => void,
  title: string = "Select Folder Gallery"
) {
  const view = new google.picker.DocsView(google.picker.ViewId.DOCS)
    .setIncludeFolders(true)
    .setMimeTypes("application/vnd.google-apps.folder")
    .setSelectFolderEnabled(true);

  view.setParent("root");

  const picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .setDeveloperKey(process.env.NEXT_PUBLIC_apiKey as string)
    .setAppId(process.env.NEXT_PUBLIC_project_id as string)
    .setOAuthToken(gapi.client.getToken().access_token)
    .addView(view)
    .setCallback((d) => {
      if (d[google.picker.Response.ACTION] == google.picker.Action.PICKED)
        setDir(d.docs![0] as gapi.client.drive.File);
    })
    .setTitle(title)
    .build();
  picker.setVisible(true);
}

export function openSelectConfigPicker(
  onSelect: (config: gapi.client.drive.File) => void
) {
  const view = new google.picker.DocsView()
    .setIncludeFolders(true)
    .setMimeTypes("application/json");
  view.setParent("root");

  const picker = new google.picker.PickerBuilder()
    .setDeveloperKey(process.env.NEXT_PUBLIC_apiKey as string)
    .setAppId(process.env.NEXT_PUBLIC_project_id as string)
    .setOAuthToken(gapi.client.getToken().access_token)
    .addView(view)
    .setSelectableMimeTypes("application/json")
    .setCallback((d) => {
      if (d[google.picker.Response.ACTION] == google.picker.Action.PICKED)
        onSelect(d.docs![0] as gapi.client.drive.File);
    })
    .setTitle("Select Configuration")
    .build();
  picker.setVisible(true);
}

export function openUploadImagesPicker(
  folder: string,
  addImages: (images: gapi.client.drive.File[]) => void
) {
  const view = new google.picker.DocsUploadView().setParent(folder);

  const picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    .setDeveloperKey(process.env.NEXT_PUBLIC_apiKey as string)
    .setAppId(process.env.NEXT_PUBLIC_project_id as string)
    .setOAuthToken(gapi.client.getToken().access_token)
    .addView(view)
    .setCallback((d) => {
      console.log(d);
      if (d[google.picker.Response.ACTION] == google.picker.Action.PICKED)
        addImages(
          (d.docs as gapi.client.drive.File[]).filter((img) =>
            img.mimeType!.startsWith("image/")
          )
        );
    })
    .setTitle("Upload Images")
    .build();
  picker.setVisible(true);
}
