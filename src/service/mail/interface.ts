import SendMailRequestDTO from "../../dtos/request/mail/SendMailRequestDTO";

export interface IMailService {
  sendMail: (request: SendMailRequestDTO) => Promise<any>;
  verifyMail: (email: String) => Promise<any>;
  confirmVerify: (token: string, email: string) => Promise<any>;
}
