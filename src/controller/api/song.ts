import { songService } from "../../service/song";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import { BaseSuccesMessage } from "../../messages/success/base";
import axios from "axios";

const SongController = {
  getAll: async (req, res, next) => {
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
      const response = await songService.getAll({}, options);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  getLyrics: async (req, res, next) => {
    try {
      const { songId } = req.params;
      const song = await songService.getLyrics(songId);
      return res.success(BaseSuccesMessage.SUCCESS, song);
    } catch (error) {
      next(error);
    }
  },
  increaseViews: async (req, res, next) => {
    try {
      const { songId } = req.params;
      const song = await songService.increaseViews(songId);
      return res.success(BaseSuccesMessage.SUCCESS, song);
    } catch (error) {
      next(error);
    }
  },
  getNewRelease: async (req, res, next) => {
    try {
      const { option } = req.query;
      const song = await songService.getNewRelease(option);
      return res.success(BaseSuccesMessage.SUCCESS, song);
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
      await axios.post("/api/v1/file", files);

      res.send("DSADSAe");
    } catch (error) {
      next(error);
    }
  },
};

export default SongController;
