import { rejects } from "assert";
import { PROVIDER } from "../../constants/provider";
import { User } from "../../models";
import { userService } from "../user";
import { IOAuth2Service } from "./interface";

const oauth2Service: IOAuth2Service = {
  success: async (data) => {
    try {
      const user = await oauth2Service.get(data);
      if (user == null) {
        const response = await userService.createOauth2(data);
        return Promise.resolve(response);
      }
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  get: async (data) => {
    let user = null;
    const provider = data.provider;
    if (provider == PROVIDER.GOOGLE) {
      user = await User.findOne({ google_id: data.id });
      if (user) return Promise.resolve(user);
    }
    if (provider == PROVIDER.FACEBOOK) {
      user = await User.findOne({ facebook_id: data.id });
      if (user) return Promise.resolve(user);
    }
    if (provider == PROVIDER.GITHUB) {
      user = await User.findOne({ github_id: data.id });
      if (user) return Promise.resolve(user);
    }
    return Promise.resolve(user);
  },
};
export default oauth2Service;
