import { BaseSuccesMessage } from "../../messages/success/base";
import { countryService } from "../../service/country";
import { hubService } from "../../service/hub";

const CountryController = {
  get4Options: async (req, res, next) => {
    try {
      const countries = await countryService.get4Options();
      return res.success(BaseSuccesMessage.SUCCESS, countries);
    } catch (err) {
      next(err);
    }
  },
};

export default CountryController;
