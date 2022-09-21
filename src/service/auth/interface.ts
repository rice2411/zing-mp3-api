import LoginRequestDTO from "../../dtos/request/auth/LoginRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";

import ResetPasswordDTO from "../../dtos/request/auth/ResetPasswordDTO";

export interface IAuthService {
  login: (loginRequestDTO: LoginRequestDTO) => Promise<any>;
  register: (registerRequestDTO: RegisterRequestDTO) => Promise<any>;

  resetPassword: (resetPasswordDTO: ResetPasswordDTO) => Promise<any>;
}
