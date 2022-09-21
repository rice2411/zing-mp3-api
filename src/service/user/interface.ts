import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";
import { IUpdateUserRequestDTO } from "../../dtos/request/user/UpdateUserRequestDTO";
import RegisterRequestDTO from "../../dtos/request/auth/RegisterRequestDTO";

export interface IUserService {
  get: (userId: mongoose.Types._ObjectId) => Promise<any>;
  list: (options: QueryOptions) => Promise<any>;
  update: (
    request: IUpdateUserRequestDTO,
    userId: mongoose.Types._ObjectId
  ) => Promise<any>;
  deactive: (listUserId: [mongoose.Types._ObjectId]) => Promise<any>;
  get_me: (req: any) => Promise<any>;
  removeDataTest: () => Promise<any>;
  importListUser: (listUser: Array<RegisterRequestDTO>) => Promise<any>;
  create: (request: RegisterRequestDTO, userCount?: number) => Promise<any>;
  createOauth2: (data: any) => Promise<any>;
}
