import { BaseErrorMessage } from "../../messages/error/base";
import { Banner } from "../../models/banner";
import { IBannerService } from "./interface";

const bannerService: IBannerService = {
  getAll: async () => {
    const banners = await Banner.find({});

    if (!banners)
      return Promise.reject(new Error(BaseErrorMessage.SOME_THING_WENT_WRONG));

    return Promise.resolve(banners);
  },
};

export { bannerService };
