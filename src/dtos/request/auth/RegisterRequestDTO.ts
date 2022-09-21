
export default class RegisterRequestDTO {
  public _username: string;
  public _password: string;

  constructor({ username, password }) {
    this._username = username;
    this._password = password;
  }

  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
}
