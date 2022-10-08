import { FILE_EXTESION, FILE_PATH } from "../../constants/file";
import { unlinkSync } from "fs";

export function configFilePath(fileExt) {
  if (FILE_EXTESION.IMAGE_EXTENSION.includes(fileExt))
    return FILE_PATH.IMAGE_PATH;
  if (FILE_EXTESION.AUDIO_EXTENSION.includes(fileExt))
    return FILE_PATH.AUDIO_PATH;
  if (FILE_EXTESION.DOCUMENT_EXTENSION.includes(fileExt))
    return FILE_PATH.DOCUMENT_PATH;
  if (FILE_EXTESION.VIDEO_EXTENSION.includes(fileExt))
    return FILE_PATH.VIDEO_PATH;
}

export const deleteImageFile = (path: string) => {
  try {
    unlinkSync(path);
  } catch (error) {
    throw new Error("Không thể xóa file !!!");
  }
};
