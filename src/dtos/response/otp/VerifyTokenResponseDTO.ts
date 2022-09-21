export default class TokenDataResponseDTO {
  public _email?: string;

  constructor({ email }) {
    this._email = email;
  }

  get email() {
    return this._email;
  }
}
