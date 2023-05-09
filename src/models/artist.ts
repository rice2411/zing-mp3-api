import { array } from "joi";
import mongoose, { Types } from "mongoose";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "avatar_default.png",
  },
  followers: {
    type: Array<any>,
    require: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  typeIds: {
    type: Array<Types.ObjectId>,
  },
});

export interface IArtist extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  description: string;
  followers: Array<any>;
  isDelete: boolean;
  typeIds: Array<Types.ObjectId>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IArtistModel extends mongoose.Model<IArtist> {
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

ArtistSchema.plugin(paginate);
ArtistSchema.plugin(aggregatePaginate);

ArtistSchema.index({
  name: "text",
});

const model = mongoose.model<IArtist, IArtistModel>("Artist", ArtistSchema);
export { model as Artist };
