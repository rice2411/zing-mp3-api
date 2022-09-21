import { sign, verify } from "jsonwebtoken";
import { ITokenService } from "./interface";

const tokenService: ITokenService = {
  generateToken: (tokenData) => {
    const token = sign({ ...tokenData.data }, tokenData.secret, {
      expiresIn: tokenData.expire_in,
    });

    return { token: token };
  },
  verifyToken: (token, secret) => {
    const verified = verify(token, secret);
    return verified;
  },
};

export default tokenService;
