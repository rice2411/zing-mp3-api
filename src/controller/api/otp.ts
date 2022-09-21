import env from "../../../config/env";

import GetMailOTPRequestDTO from "../../dtos/request/otp/GetMailOTPRequestDTO";

import tokenService from "../../service/token";
import TokenDataResponseDTO from "../../dtos/response/token/TokenDataResponseDTO";

import { BaseSuccesMessage } from "../../messages/success/base";
import { otpService } from "../../service/otp";
import OTPRequestDTO from "../../dtos/request/otp/OTPRequestDTO";
import GetPhoneOTPRequestDTO from "../../dtos/request/otp/GetPhoneOTPRequestDTO";

const otpController = {
  sendMail: async (req, res, next) => {
    try {
      const getMailDTORequest = new GetMailOTPRequestDTO(req.query);
      const OTPResponse = await otpService.sendMail(getMailDTORequest);
      return res.success(BaseSuccesMessage.SUCCESS, OTPResponse);
    } catch (error) {
      next(error);
    }
  },
  sendPhone: async (req, res, next) => {
    try {
      const phone = new GetPhoneOTPRequestDTO({ phone: "123" });
      const response = await otpService.sendPhone(phone);
      return res.success(BaseSuccesMessage.SUCCESS, response);
    } catch (error) {
      next(error);
    }
  },
  verify: async (req, res, next) => {
    try {
      const OTPRequest = new OTPRequestDTO(req.body);

      const OTPResponse = await otpService.verify(OTPRequest);
      const payload = {
        data: OTPResponse,
        secret: env.otp.secret,
        expire_in: env.otp.expiresIn,
      };
      const tokenData = new TokenDataResponseDTO(payload);
      const tokenResult = tokenService.generateToken(tokenData);
      return res.success(BaseSuccesMessage.SUCCESS, tokenResult);
    } catch (error) {
      if (error.message == "jwt expired") {
        res.errors("JWT hết hạn");
      }
      next(error);
    }
  },
};

export default otpController;
