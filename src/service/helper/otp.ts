import otpGenerator from 'otp-generator' 
import {OTP_CONFIG} from '../../constants/OTP'

export const generateOtp = () => {
    return otpGenerator.generate(OTP_CONFIG.length, OTP_CONFIG.options);
}