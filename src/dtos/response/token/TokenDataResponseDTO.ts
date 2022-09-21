export default class TokenDataResponseDTO {
  public _data?: any;
  public _secret?: string;
  public _expire_in?: string;

  constructor({ data, secret, expire_in }) {
    this._data = data;
    this._secret = secret;
    this._expire_in = expire_in;
  }

  get data() {
    return this._data;
  }
  get secret() {
    return this._secret;
  }
  get expire_in() {
    return this._expire_in;
  }
}
