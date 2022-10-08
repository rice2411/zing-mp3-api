import { FILE_EXTESION, FILE_PATH } from "../../constants/file";
import { unlinkSync } from "fs";
import { FileErrorMessage } from "../../messages/error/file";
import { FileSuccessMessage } from "../../messages/success/file";

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
    return FileSuccessMessage.DELETE_FILE_SUCCESS;
  } catch (error) {
    return FileErrorMessage.CAN_NOT_DELETE_FILE;
  }
};
