import { v4 as uuidv4 } from "uuid";
import { ACCOUNT_TYPE } from "../../../constants/account";
import { NAME_DEFAULT } from "../../../constants/user";
export default class GitHubRequestDTO {
  public github_id?: string;
  public first_name?: string;
  public last_name?: string;
  public avatar?: string;
  public email?: string;
  public password?: string;
  public username?: string;
  public type_account?: string;

  constructor(data) {
    if (data?.emails) {
      this.email = data?.emails[0]?.value;
    }
    if (data?.photos) {
      this.avatar = data?.photos[0]?.value;
    }
    this.github_id = data.id;
    this.first_name = "";
    this.last_name = data.username;
    this.password = uuidv4();
    this.username = NAME_DEFAULT + this.github_id;
    this.type_account = ACCOUNT_TYPE.GITHUB;
  }
  get() {
    return this;
  }
}
