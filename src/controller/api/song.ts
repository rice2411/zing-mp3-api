import { songService } from "../../service/song";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import { BaseSuccesMessage } from "../../messages/success/base";
import axios from "axios";

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
      await axios.post("/api/v1/file", files);

      res.send("DSADSAe");
    } catch (error) {
      next(error);
    }
  },
};

export default SongController;
