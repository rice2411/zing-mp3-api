import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";

export interface IUserService {
  list: (options: QueryOptions) => Promise<any>;
}
