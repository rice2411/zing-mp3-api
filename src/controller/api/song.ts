import { songService } from "../../service/song";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import { BaseSuccesMessage } from "../../messages/success/base";
import fileService from "../../service/file/file";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";
import { FILE_EXNTESION } from "../../constants/file";

const SongController = {
  list: async (req, res, next) => {
    try {
      const search = req?.query.search;
      const options: QueryOptions = {
        page: req?.query.page ?? PAGING_DEFAULT.PAGE,
        limit: req?.query.limit ?? PAGING_DEFAULT.LIMIT,
        search,
        is_paginate:
          req?.query?.is_paginate == false ||
          req?.query?.is_paginate == "false" ||
          req?.query?.is_paginate == 0
            ? false
            : true,
      };
      const result = await songService.list(options);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (error) {
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      const song = await songService.get(id);
      return res.success(BaseSuccesMessage.SUCCESS, song);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const files = req.files;
      const fileUploads = await fileService.upload(files);
      const createSongRequestDTO = new CreateSongRequestDTO({
        ...req.body,
        audio: fileUploads.find((file) =>
          FILE_EXNTESION.AUDIO_EXTENSION.includes("." + file.split(".")[1])
        ),
        image: fileUploads.find((file) =>
          FILE_EXNTESION.IMAGE_EXTENSION.includes("." + file.split(".")[1])
        ),
      });
      const response = await songService.create(createSongRequestDTO);
      res.send(response);
    } catch (error) {
      next(error);
    }
  },
};

export default SongController;
