import QueryOptions from "../../dtos/QueryOptions";
import mongoose from "mongoose";

export interface ISongService {
  get: (songId: mongoose.Types.ObjectId) => Promise<any>;
  getNewRelease: (option: number) => Promise<any>;
  randomViews: () => Promise<any>;
  increaseViews: (songId: string) => Promise<any>;
  getLyrics: (songId: string) => Promise<any>;
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
}
