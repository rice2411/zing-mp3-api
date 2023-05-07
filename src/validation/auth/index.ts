import LoginRequestDTO from "../../dtos/request/auth/LoginRequestDTO";
import * as validationUtils from "../../utils/utils";
import { AuthErrorMessage } from "../../messages/error/auth";

class AuthValidation {
  public loginValidation = (params: LoginRequestDTO): any[] => {
    const errors = [];

    if (validationUtils.isBlank(params.username)) {
      errors.push(AuthErrorMessage.USERNAME_IS_REQUIRED);
    }
    if (validationUtils.isBlank(params.password)) {
      errors.push(AuthErrorMessage.PASSWORD_IS_REQUIRED);
    }

    return errors;
  };
}

const authValidation = new AuthValidation();
export default authValidation;
