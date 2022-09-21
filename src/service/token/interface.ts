import TokenDataResponseDTO from "../../dtos/response/token/TokenDataResponseDTO";

export interface ITokenService {
  generateToken: (tokenData: TokenDataResponseDTO) => Object;
  verifyToken: (token: string, secret: string) => any;
}
