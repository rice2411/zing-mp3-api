import path from "path";
import { FILE_PATH } from "../../constants/file";
import { v4 as uuidv4 } from "uuid";
import { configFilePath } from "../helper/file";
import { BaseErrorMessage } from "../../messages/error/base";
import fileValidation from "../../validation/file";
import { IFileService } from "./interface";
import { deleteImageFile } from "../helper/file";

const fileService: IFileService = {
  upload: async (files) => {
    try {
      const validateErrors = fileValidation.uploadRequest(files);
      if (validateErrors.length)
        return Promise.reject(new Error(validateErrors?.[0]));

      let fileUploads = [];
      Object.keys(files).forEach((key) => {
        let extFile = path.extname(files[key].name);
        let savePath = configFilePath(extFile);
        const fileName = uuidv4() + extFile;
        fileUploads.push(fileName);
        const filepath = path.join(__dirname, "../..", savePath, fileName);
        files[key].mv(filepath, (err) => {
          if (err)
            return Promise.reject(
              new Error(BaseErrorMessage.SOME_THING_WENT_WRONG)
            );
        });
      });
      return Promise.resolve(
        fileUploads.length > 1 ? fileUploads : fileUploads[0]
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
  get: async (fileName, res, next) => {
    const savePath = configFilePath(path.extname(fileName));
    res.sendFile(path.join(__dirname, "../..", savePath + fileName), (err) => {
      if (err) {
        next(err);
      }
    });
  },
  delete: async (fileName) => {
    try {
      const savePath = configFilePath(path.extname(fileName));
      const deleteFile = deleteImageFile(
        path.join(__dirname, "../..", savePath + fileName)
      );
      return Promise.resolve(deleteFile);
    } catch (error) {
      Promise.reject(error);
    }
  },
};

export default fileService;
