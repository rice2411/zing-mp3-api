export default class OTPRequestDTO {
  public _email: string;
  public _otp: string;

  constructor({ email, otp }) {
    this._email = email;
    this._otp = otp;
  }

  get otp() {
    return this._otp;
  }

  get email() {
    return this._email;
  }
}
