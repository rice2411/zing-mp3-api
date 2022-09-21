import { ca } from "date-fns/locale";
import SendMailRequestDTO from "../../dtos/request/mail/SendMailRequestDTO";
import { BaseSuccesMessage } from "../../messages/success/base";
import mailService from "../../service/mail";

const mailController = {
  sendMail: async (req, res, next) => {
    try {
      const request = new SendMailRequestDTO(req.body);
      const result = await mailService.sendMail(request);
      return res.success(BaseSuccesMessage.SUCCESS, result);
    } catch (err) {
      next(err);
    }
  },
  verify: async (req, res, next) => {
    try {
      const { email } = req.query;
      const response = await mailService.verifyMail(email);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
  confirmVerify: async (req, res, next) => {
    try {
      const { token, email } = req.body;
      const response = await mailService.confirmVerify(token, email);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (err) {
      next(err);
    }
  },
};

export default mailController;
