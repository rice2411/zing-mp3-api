import { songService } from "../../service/song";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import { BaseSuccesMessage } from "../../messages/success/base";
import axios from "axios";
import { bannerService } from "../../service/banner";
import { transactionService } from "../../service/admin/transaction";
import { StatisticService } from "../../service/admin/statistic";

const TransactionController = {
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
      const response = await transactionService.getAll({}, options);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  statistic: async (req, res, next) => {
    try {
      const response = await StatisticService.getStatistic();
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
};

export default TransactionController;
