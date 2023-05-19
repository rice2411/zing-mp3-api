import OptionMailTemplateDTO from "../dtos/request/mail/OptionMailTemplateDTO";
const { NODE_RICE_APP_URI } = process.env;
const MAIL_TEMPLATE = {
  OTP_TEMPLATE: (otp) => {
    const options = {
      subject: "Xác thực OTP",
      html: `</h1>Mã OTP của bạn là: ${otp} </>`,
    };
    const otp_template = new OptionMailTemplateDTO(options);
    return otp_template;
  },
  VERIFY_EMAIL_TEMPLATE: (token, email) => {
    const options = {
      subject: "Xác thực email",
      html: `</h1>Nhấp vào đường link sau để xác thực email của bạn: ${NODE_RICE_APP_URI}/api/v1/mail/confirm-verify?token=${token}&email=${email} </>`,
    };
    const otp_template = new OptionMailTemplateDTO(options);
    return otp_template;
  },
};
export default MAIL_TEMPLATE;
