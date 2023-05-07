import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IOTP {
  email: string;
  otp: string;
  createdAt: Date;
  updatedAt: Date;
}

const OTPSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<IOTP>("OTP", OTPSchema);

export { model as OTP };
