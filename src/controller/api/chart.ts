import { time } from "console";
import { BaseSuccesMessage } from "../../messages/success/base";
import chartService from "../../service/chart";

const chartController = {
  get: async (req, res, next) => {
    try {
      const { option } = req.query;
      const result = await chartService.get(option);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
};

export default chartController;
