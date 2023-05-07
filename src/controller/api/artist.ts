import ar from "date-fns/esm/locale/ar/index.js";
import path from "path";

import { FILE_PATH } from "../../constants/file";
import { BaseSuccesMessage } from "../../messages/success/base";
import { albumService } from "../../service/album";
import { artistService } from "../../service/artist";
import fileService from "../../service/file/file";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";

const artistController = {
  get: async (req, res, next) => {
    try {
      const { artistId } = req.params;
      const result = await artistService.get(artistId);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  appearIn: async (req, res, next) => {
    try {
      const { artistId } = req.params;
      const result = await artistService.appearIn(artistId);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
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
      const response = await artistService.getAll({}, options);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
};

export default artistController;
