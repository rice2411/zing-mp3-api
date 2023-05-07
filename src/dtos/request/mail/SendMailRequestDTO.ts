import OptionMailTemplateDTO from "./OptionMailTemplateDTO";

export default class SendMailRequestDTO {
  public email?: string;
  public options?: OptionMailTemplateDTO;

  constructor({ email, options }) {
    this.email = email;
    this.options = options;
  }
}
