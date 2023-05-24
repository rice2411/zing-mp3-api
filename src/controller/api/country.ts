import { BaseSuccesMessage } from "../../messages/success/base";
import { countryService } from "../../service/country";
import { hubService } from "../../service/hub";
const cloudinary = require("cloudinary").v2;

const CountryController = {
  get4Options: async (req, res, next) => {
    try {
      // cloudinary.config({
      //   cloud_name: "dhsov12ep",
      //   api_key: "456972657293882",
      //   api_secret: "KVH1Sb4vpG-Rz6QAwgI8tvFId7E",
      // });
      // cloudinary.uploader.upload(
      //   "https://zing-mp3-api.onrender.com/api/v1/file/canbang.mp3",
      //   { public_id: "canbang.mp3" },
      //   function (error, result) {
      //     console.log(result);
      //     console.log(error);
      //   }
      // );
      const countries = await countryService.get4Options();
      return res.success(BaseSuccesMessage.SUCCESS, countries);
    } catch (err) {
      next(err);
    }
  },
};

export default CountryController;
