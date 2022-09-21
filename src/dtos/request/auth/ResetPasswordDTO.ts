export default class RegisterRequestDTO {
  public _email: string;
  public _password: string;

  constructor({ email, password }) {
    this._email = email;
    this._password = password;
  }

  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
}
