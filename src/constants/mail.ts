import OptionMailTemplateDTO from "../dtos/request/mail/OptionMailTemplateDTO";

const MAIL_TEMPLATE = {
  OTP_TEMPLATE: (otp) => {
    const options = {
      subject: "Xác thực OTP",
      html: `</h1>Mã OTP của bạn là: ${otp} </>`,
    };
    const otp_template = new OptionMailTemplateDTO(options);
    return otp_template;
  },
  VERIFY_EMAIL_TEMPLATE: (token) => {
    const options = {
      subject: "Xác thực email",
      html: `</h1>Nhấp vào đường link sau để xác thực email của bạn: ${token} </>`,
    };
    const otp_template = new OptionMailTemplateDTO(options);
    return otp_template;
  },
};
export default MAIL_TEMPLATE;
