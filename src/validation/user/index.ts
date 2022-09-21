import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";
import { IUpdateUserRequestDTO } from "../../dtos/request/user/UpdateUserRequestDTO";
import * as validationUtils from "../../utils/utils";
import { UserErrorMessage } from "../../messages/error/user";

class UserValidation {
  public registerRequest = (params: RegisterRequestDTO): any[] => {
    const errors = [];
    if (validationUtils.isBlank(params._username)) {
      errors.push(UserErrorMessage.USERNAME_IS_REQUIRED);
    }
    if (validationUtils.isBlank(params._password)) {
      errors.push(UserErrorMessage.PASSWORD_IS_REQUIRED);
    }
    if (params._password.length < 6) {
      errors.push(UserErrorMessage.PASSWORD_TOO_SHORT);
    }
    return errors;
  };
  public updateUserReqest = (params: IUpdateUserRequestDTO): any[] => {
    const errors = [];
    if (validationUtils.isBlank(params.username)) {
      errors.push(UserErrorMessage.USERNAME_IS_REQUIRED);
    }
    return errors;
  };
}

const userValidation = new UserValidation();
export default userValidation;
