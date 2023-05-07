export default class GetPhoneOTPRequestDTO {
  public _phone: string;

  constructor({ phone }) {
    this._phone = phone;
  }

  get phone() {
    return this._phone;
  }
}
