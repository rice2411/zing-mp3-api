import mongoose, { Types } from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";
export interface IAlbumService {
  getRecentAlbum: (request: any) => Promise<any>;
  getSuggestAlbum: () => Promise<any>;
  getDailyTopic: () => Promise<any>;
  getTop100: () => Promise<any>;
  getSuggestType: (type: string) => Promise<any>;
  getDetailAlbum: (id: String) => Promise<any>;
  getNeighbourAlbum: (typeId: string) => Promise<any>;
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
}
