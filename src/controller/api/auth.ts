import env from "../../../config/env";
import LoginRequestDTO from "../../dtos/request/auth/LoginRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";
import HashFunction from "../../helpers/HashFunction";
import { authService } from "../../service/auth/auth";
import authValidation from "../../validation/auth";
import userValidation from "../../validation/user";

import tokenService from "../../service/token";
import TokenDataResponseDTO from "../../dtos/response/token/TokenDataResponseDTO";
import ResetPasswordDTO from "../../dtos/request/auth/ResetPasswordDTO";
import { BaseSuccesMessage } from "../../messages/success/base";

const authController = {
  login: async (req, res, next) => {
    try {
      const loginRequest = new LoginRequestDTO(req.body);
      const validateErrors = authValidation.loginValidation(loginRequest);
      if (validateErrors.length) return res.errors(validateErrors?.[0]);
      const userResponse = await authService.login(loginRequest);
      const secret = env.jwt.secret;
      const expire_in = env.jwt.expiresIn;
      const payload = {
        data: userResponse,
        secret: secret,
        expire_in: expire_in,
      };
      const tokenData = new TokenDataResponseDTO(payload);
      const tokenResult = tokenService.generateToken(tokenData);
      return res.success(BaseSuccesMessage.SUCCESS, tokenResult);
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      let registerRequest = new RegisterRequestDTO(req.body);
      const validErrors = userValidation.registerRequest(registerRequest);
      if (validErrors.length) return res.errors(validErrors[0], 400);
      registerRequest._password = HashFunction.generate(
        registerRequest._password
      );
      const userResponse = await authService.register(registerRequest);
      return res.success(BaseSuccesMessage.SUCCESS, userResponse);
    } catch (error) {
      next(error);
    }
  },
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1].trim();
      tokenService.verifyToken(token, env.jwt.secret);
      return res.success(BaseSuccesMessage.SUCCESS);
    } catch (err) {
      return res.errors("JWT hết hạn", 401);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.body;
      const info = tokenService.verifyToken(token, env.otp.secret);
      const resetPasswordDTO = new ResetPasswordDTO({
        email: info._email,
        password: req.body.password,
      });
      const resetPasswordResult = await authService.resetPassword(
        resetPasswordDTO
      );
      return res.success(BaseSuccesMessage.SUCCESS, resetPasswordResult);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
