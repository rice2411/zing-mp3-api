import LoginRequestDTO from "../../../dtos/request/auth/LoginRequestDTO";
import RegisterRequestDTO from "../../../dtos/request/auth/RegisterRequestDTO";
import GetMailOTPRequestDTO from "../../../dtos/request/otp/GetMailOTPRequestDTO";

import ResetPasswordDTO from "../../../dtos/request/auth/ResetPasswordDTO";
import OTPRequestDTO from "../../../dtos/request/otp/OTPRequestDTO";
import GetPhoneOTPRequestDTO from "../../../dtos/request/otp/GetPhoneOTPRequestDTO";
import QueryOptions from "../../../dtos/QueryOptions";

export interface ITransactionService {
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
  create: (param) => Promise<any>;
}
