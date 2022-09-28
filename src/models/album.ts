import mongoose, { Types } from "mongoose";
import { ALBUM_DEFAULT } from "../constants/model/album";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
    default: ALBUM_DEFAULT.IMAGE_DEFAULT,
  },
  publicationYear: {
    type: Date,
    require: true,
  },
  artistId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  typeIds: {
    type: Array,
    require: true,
  },
});

export interface IAlbum extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  image: string;
  publicationYear: Date;
  artistId: Types.ObjectId;
  typeIds: Array<Types.ObjectId>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IAlbumModel extends mongoose.Model<IAlbum> {
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

AlbumSchema.plugin(paginate);
AlbumSchema.plugin(aggregatePaginate);

AlbumSchema.index({
  name: "text",
});

const model = mongoose.model<IAlbum, IAlbumModel>("Album", AlbumSchema);
export { model as Album };
