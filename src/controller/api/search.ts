import ar from "date-fns/esm/locale/ar/index.js";
import path from "path";

import { FILE_PATH } from "../../constants/file";
import { BaseSuccesMessage } from "../../messages/success/base";
import { albumService } from "../../service/album";
import { artistService } from "../../service/artist";
import fileService from "../../service/file/file";
import { searchService } from "../../service/search";

const SearchController = {
  suggestSearch: async (req, res, next) => {
    try {
      const { search } = req.query;
      const result = await searchService.suggestSearch(search);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  searchFull: async (req, res, next) => {
    try {
      const { search, tab } = req.query;
      const result = await searchService.searchFull({
        search: search,
        tab: tab,
      });
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
};

export default SearchController;
