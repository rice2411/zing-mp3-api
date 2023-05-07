import mongoose, { Types } from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";
export interface IArtistService {
  appearIn: (artistId: string) => Promise<any>;
  get: (artistId: string) => Promise<any>;
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
}
