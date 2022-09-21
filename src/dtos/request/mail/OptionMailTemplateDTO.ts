export default class OptionMailTemplateDTO {
  public subject?: string;
  public html?: string;

  constructor({ subject, html }) {
    this.subject = subject;
    this.html = html;
  }
}
