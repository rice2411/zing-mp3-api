import mongoose, { Types } from "mongoose";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  recentAlbums: {
    type: Array,
    require: true,
  },
  likedSongs: {
    type: Array,
    require: true,
  },
  likedAlbums: {
    type: Array,
    require: true,
  },
  likedArtists: {
    type: Array,
    require: true,
  },
  playlist: {
    type: Array,
    require: true,
  },
});
export interface ILibrary extends mongoose.Document {
  _id: Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  recentAlbums: Array<any>;
  likedSongs: Array<any>;
  likedArtists: Array<any>;
  likedAlbums: Array<any>;
  playlist: Array<any>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ILibraryModel extends mongoose.Model<ILibrary> {
  aggregatePaginateCustom(
    aggregates: mongoose.Aggregate<any[]>,
    arg1: { page: number; limit: number }
  ): any;
  get(_id: string): Promise<any>;
  list({
    skip,
    limit,
    is_paginate,
    search,
  }?: {
    skip?: number;
    limit?: number;
    is_paginate: boolean;
    search: string;
  }): Promise<any>;
  execAsync(): Promise<any>;
}

LibrarySchema.plugin(paginate);
LibrarySchema.plugin(aggregatePaginate);

const model = mongoose.model<ILibrary, ILibraryModel>("Library", LibrarySchema);

export { model as Library };
