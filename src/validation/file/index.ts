import * as validationUtils from "../../utils/utils";
import fileMiddleWare from "../../middlewares/file/fileMiddleWare";
import path from "path";
import { ACCEPTED_FILE, FILE_SIZE_LIMIT, MB } from "../../constants/file";

class FileValidation {
  public uploadRequest = (files): any[] => {
    const errors = [];

    const fileExtensions = [];
    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    // Are the file extension allowed?
    const allowed = fileExtensions.every((ext) => ACCEPTED_FILE.includes(ext));
    if (!allowed) {
      const message =
        `Không thể tải file. Chỉ chấp nhận các định dạng sau đây: ${ACCEPTED_FILE.toString()}.`.replaceAll(
          ",",
          ", "
        );

      errors.push(message);
    }

    const filesOverLimit = [];
    // Which files are over the limit?
    Object.keys(files).forEach((key) => {
      if (files[key].size > FILE_SIZE_LIMIT) {
        filesOverLimit.push(files[key].name);
      }
    });

    if (filesOverLimit.length) {
      const properVerb = filesOverLimit.length > 1 ? "are" : "is";

      const sentence =
        `Không thể tải file. ${filesOverLimit.toString()} ${properVerb} vượt quá mức dung lượng cho phép: ${MB} MB.`.replaceAll(
          ",",
          ", "
        );

      const message =
        filesOverLimit.length < 3
          ? sentence.replace(",", " and")
          : sentence.replace(/,(?=[^,]*$)/, " and");
      errors.push(message);
    }
    if (!files) {
      const message = "Vui lòng chọn file";
      errors.push(message);
    }

    return errors;
  };
}

const fileValidation = new FileValidation();
export default fileValidation;
