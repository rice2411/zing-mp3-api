import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";
import UpdateSongRequestDTO from "../../dtos/request/song/UpdateSongRequestDTO";

export interface ISongService {
  list: (options: QueryOptions) => Promise<any>;
  get: (options: mongoose.Types.ObjectId) => Promise<any>;
  create: (createSongRequestDTO: CreateSongRequestDTO) => Promise<any>;
  update: (updateSongRequestDTO: UpdateSongRequestDTO) => Promise<any>;
  delete: (id: mongoose.Types.ObjectId) => Promise<any>;
}
