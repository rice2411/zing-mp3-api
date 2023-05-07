import { BaseSuccesMessage } from "../../messages/success/base";
import { hubService } from "../../service/hub";

const HubController = {
  getAll: async (req, res, next) => {
    try {
      const hubs = await hubService.getAll();
      return res.success(BaseSuccesMessage.SUCCESS, hubs);
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const { hubId } = req.params;
      const hub = await hubService.get(hubId);
      return res.success(BaseSuccesMessage.SUCCESS, hub);
    } catch (err) {
      next(err);
    }
  },
};

export default HubController;
