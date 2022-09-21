import { v4 as uuidv4 } from "uuid";
import { ACCOUNT_TYPE } from "../../../constants/account";
import { NAME_DEFAULT } from "../../../constants/user";
export default class GoogleRequestDTO {
  public google_id?: string;
  public first_name?: string;
  public last_name?: string;
  public avatar?: string;
  public email?: string;
  public password?: string;
  public username?: string;
  public type_account?: string;

  constructor(data) {
    this.google_id = data.id;
    this.first_name = data.name.givenName;
    this.last_name = data.name.familyName;
    this.email = data.emails[0].value;
    this.avatar = data.photos[0].value;
    this.password = uuidv4();
    this.username = NAME_DEFAULT + this.google_id;
    this.type_account = ACCOUNT_TYPE.GOOGLE;
  }
  get() {
    return this;
  }
}
