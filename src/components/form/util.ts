import { FilePreview, OnlyPreview } from "./Dropzone";

export const fileWithPreview = (file: File | string): FilePreview => {
  if (typeof file == "string") return { preview: file } as OnlyPreview;

  return Object.assign(file, {
    preview: URL.createObjectURL(file as File),
  });
};
