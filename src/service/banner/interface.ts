import LoginRequestDTO from "../../dtos/request/auth/LoginRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";
import GetMailOTPRequestDTO from "../../dtos/request/otp/GetMailOTPRequestDTO";

import ResetPasswordDTO from "../../dtos/request/auth/ResetPasswordDTO";
import OTPRequestDTO from "../../dtos/request/otp/OTPRequestDTO";
import GetPhoneOTPRequestDTO from "../../dtos/request/otp/GetPhoneOTPRequestDTO";

export interface IBannerService {
  getAll: () => Promise<any>;
}
