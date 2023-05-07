import { BaseErrorMessage } from "../../messages/error/base";
import { Country, Hub } from "../../models";
import { ICountryService } from "./interface";

const countryService: ICountryService = {
  get4Options: async () => {
    const countries = await Country.find({
      name: {
        $in: ["Viet Nam", "China", "United States", "Korea, Republic of"],
      },
    });

    return Promise.resolve(countries);
  },
};

export { countryService };
