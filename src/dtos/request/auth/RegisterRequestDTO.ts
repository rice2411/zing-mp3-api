export default class RegisterRequestDTO {
  public _username: string;
  public _password: string;
  public _email: string;
  constructor({ username, password, email }) {
    this._username = username;
    this._password = password;
    this._email = email;
  }

  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  get email() {
    return this.email;
  }
}
