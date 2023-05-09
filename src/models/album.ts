import mongoose, { Types } from "mongoose";

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
    default: "",
  },
  type: {
    type: String,
    require: true,
    default: "playlist",
  },
  image: {
    type: String,
    default: "album_default.png",
  },
  publicationYear: {
    type: Date,
    default: new Date(),
  },
  artistId: {
    type: Array<mongoose.Types.ObjectId>,
    required: true,
  },
  followers: {
    type: Array<mongoose.Types.ObjectId>,
    required: true,
    default: [],
  },
  typeIds: {
    type: Array,
    require: true,
    default: [],
  },
  likes: {
    type: Number,
    require: true,
    default: 0,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

export interface IAlbum extends mongoose.Document {
  _id: Types.ObjectId;
  name?: string;
  description?: string;
  image?: string;
  publicationYear?: Date;
  artistId?: Array<Types.ObjectId>;
  typeIds?: Array<Types.ObjectId>;
  followers?: Array<Types.ObjectId>;
  authors?: Array<Object>;
  likes?: Number;
  type?: string;
  isDelete: boolean;
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
