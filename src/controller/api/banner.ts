import { songService } from "../../service/song";
import QueryOptions from "../../dtos/QueryOptions";
import { PAGING_DEFAULT } from "../../constants/paging";
import { BaseSuccesMessage } from "../../messages/success/base";
import axios from "axios";
import { bannerService } from "../../service/banner";

const BannerController = {
  getAll: async (req, res, next) => {
    try {
      const banners = await bannerService.getAll();
      return res.success(BaseSuccesMessage.SUCCESS, banners);
    } catch (err) {
      next(err);
    }
  },
};

export default BannerController;
