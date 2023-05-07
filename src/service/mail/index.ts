import nodemailer from "nodemailer";
import { IMailService } from "./interface";
import env from "../../../config/env";
import tokenService from "../token";
import TokenDataResponseDTO from "../../dtos/response/token/TokenDataResponseDTO";
import MAIL_TEMPLATE from "../../constants/mail";
import SendMailRequestDTO from "../../dtos/request/mail/SendMailRequestDTO";

import { User } from "../../models";
import { MailSuccessMessage } from "../../messages/success/mail";

const mailService: IMailService = {
  sendMail: async (request) => {
    const mailOption = {
      from: env.mail.root,
      to: request.email,
      ...request.options,
    };
    try {
      const transporter = nodemailer.createTransport({
        service: env.mail.service,
        auth: {
          user: env.mail.root,
          pass: env.mail.key,
        },
      });
      await transporter.sendMail(mailOption);
      return Promise.resolve(MailSuccessMessage.SEND_MAIL_SUCCESS);
    } catch (err) {
      return Promise.reject({
        message: err.message,
      });
    }
  },
  verifyMail: async (email) => {
    try {
      const secret = env.mail.secret;
      const expiresIn = env.mail.expiresIn;
      const payload = {
        data: email,
        secret: secret,
        expire_in: expiresIn,
      };
      const tokenData = new TokenDataResponseDTO(payload);
      const tokenResult: any = tokenService.generateToken(tokenData);
      const templateMail = MAIL_TEMPLATE.VERIFY_EMAIL_TEMPLATE(
        tokenResult.token
      );
      const option = {
        email: email,
        options: templateMail,
      };
      const sendMailRequest = new SendMailRequestDTO(option);
      const response = await mailService.sendMail(sendMailRequest);
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  confirmVerify: async (token, email) => {
    try {
      const secret = env.mail.secret;
      const verified = tokenService.verifyToken(token, secret);
      if (verified) {
        const user = await User.findOne({ email: email });
        user.email_verified = true;
        await user.save();
        return Promise.resolve(MailSuccessMessage.VERIFY_EMAIL_SUCCESS);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default mailService;
