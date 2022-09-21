import { FILE_EXNTESION, FILE_PATH } from "../../constants/file";

export function configFilePath(fileExt) {
  if (FILE_EXNTESION.IMAGE_EXTENSION.includes(fileExt))
    return FILE_PATH.IMAGE_PATH;
  if (FILE_EXNTESION.AUDIO_EXTENSION.includes(fileExt))
    return FILE_PATH.AUDIO_PATH;
  if (FILE_EXNTESION.DOCUMENT_EXTENSION.includes(fileExt))
    return FILE_PATH.DOCUMENT_PATH;
  if (FILE_EXNTESION.VIDEO_EXTENSION.includes(fileExt))
    return FILE_PATH.VIDEO_PATH;
}
