import { IUser } from "../../../models/user";
import RegisterRequestDTO from "../../request/auth/RegisterRequestDTO";

export interface ICreateUserResponseDTIO {
  username?: String;
  password?: String;
}
export default class CreateUserResponseDTO {
  public _username?: String;
  public _password?: String;

  get userName() {
    return this._username;
  }

  setUserName(_username: String) {
    this._username = _username;
    return this;
  }
  get password() {
    return this._username;
  }

  setPassword(_password: String) {
    this._password = _password;
    return this;
  }

  get(): ICreateUserResponseDTIO {
    const request: ICreateUserResponseDTIO = {
      username: this._username,
      password: this._password,
    };

    return request;
  }
  toJSON(model: RegisterRequestDTO) {
    if (!model) return null;
    return this.setUserName(model.username).setPassword(model.password).get();
  }
}
