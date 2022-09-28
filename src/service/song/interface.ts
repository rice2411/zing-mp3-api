import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";

export interface ISongService {
  list: (options: QueryOptions) => Promise<any>;
  get: (options: mongoose.Types.ObjectId) => Promise<any>;
}
