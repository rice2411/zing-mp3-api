import path from "path";

import { FILE_PATH } from "../../constants/file";
import { BaseSuccesMessage } from "../../messages/success/base";
import fileService from "../../service/file/file";

const fileController = {
  upload: async (req, res, next) => {
    try {
      const files = req.files;
      const result = await fileService.upload(files);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  getFile: async (req, res, next) => {
    try {
      const { file } = req.params;
      await fileService.get(file, res, next);
    } catch (err) {
      next(err);
    }
  },
};

export default fileController;
