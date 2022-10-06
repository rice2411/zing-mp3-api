import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";

export interface ISongService {
  list: (options: QueryOptions) => Promise<any>;
  get: (options: mongoose.Types.ObjectId) => Promise<any>;
  create: (createSongRequestDTO: CreateSongRequestDTO) => Promise<any>;
}
