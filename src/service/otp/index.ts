import GetMailOTPRequestDTO from "../../dtos/request/otp/GetMailOTPRequestDTO";
import HashFunction from "../../helpers/HashFunction";
import { User } from "../../models/user";
import { AuthErrorMessage } from "../../messages/error/auth";
import { OTP } from "../../models/index";
import { generateOtp } from "../helper/otp";
import mailService from "../mail/index";
import MAIL_TEMPLATE from "../../constants/mail";
import SendMailRequestDTO from "../../dtos/request/mail/SendMailRequestDTO";
import { addMinutes } from "../helper/date";
import { OTP_CONFIG } from "../../constants/OTP";
import VerifyTokenResponseDTO from "../../dtos/response/otp/VerifyTokenResponseDTO";
import { Error } from "mongoose";
import { IOTPSerivce } from "./interface";
import GetPhoneOTPRequestDTO from "../../dtos/request/otp/GetPhoneOTPRequestDTO";
import env from "../../../config/env";
import tokenService from "../token";
import TokenDataResponseDTO from "../../dtos/response/token/TokenDataResponseDTO";

const otpService: IOTPSerivce = {
  sendMail: async (getMailOTPRequestDTO: GetMailOTPRequestDTO) => {
    try {
      const userEmail = getMailOTPRequestDTO.email;
      const user = await User.findOne({ email: userEmail });
      if (!user)
        return Promise.reject(new Error(AuthErrorMessage.EMAIL_IS_NOT_EXIST));

      if (!user.email_verified)
        return Promise.reject(
          new Error(AuthErrorMessage.EMAIL_IS_NOT_VERIFIED)
        );

      await OTP.deleteMany({ email: userEmail });
      const otpGenarate = generateOtp();

      const payload = {
        data: { otp: otpGenarate },
        secret: env.otp.secret,
        expire_in: env.otp.expiresIn,
      };

      const tokenData = new TokenDataResponseDTO(payload);
      console.log(tokenData);
      const OTPToken: any = await tokenService.generateToken(tokenData);
      await OTP.create({
        email: userEmail,
        otp: OTPToken.token,
      });

      const templateMail = MAIL_TEMPLATE.OTP_TEMPLATE(otpGenarate);

      const options = {
        email: userEmail,
        options: templateMail,
      };

      const sendMailOTPRequestDTO = new SendMailRequestDTO(options);

      const response = await mailService.sendMail(sendMailOTPRequestDTO);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  sendPhone: async (getPhoneOTPRequestDTO: GetPhoneOTPRequestDTO) => {
    try {
      var sid = env.sms.sid;
      var auth_token = env.sms.auth_token;

      var twilio = require("twilio")(sid, auth_token);
      const response = await twilio.messages.create({
        from: "+16188160982",
        to: "+84776750418",
        body: "bủ bủ lờ mao",
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  verify: async (OTPRequest) => {
    try {
      const otp = await OTP.findOne({ email: OTPRequest.email });

      if (!otp)
        return Promise.reject(new Error(AuthErrorMessage.EMAIL_IS_NOT_EXIST));
      const verifyOTP = tokenService.verifyToken(otp.otp, env.otp.secret);
      if (OTPRequest._otp !== verifyOTP.otp)
        return Promise.reject(new Error(AuthErrorMessage.OTP_NOT_MATCH));

      return Promise.resolve(
        new VerifyTokenResponseDTO({ email: OTPRequest.email })
      );
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { otpService };
