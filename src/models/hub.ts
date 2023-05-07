import mongoose, { Types } from "mongoose";
import { TYPE_DEFAULT } from "../constants/model/type";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const HubSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    default: TYPE_DEFAULT.IMAGE_DEFAULT,
  },
  avatar: {
    type: String,
    required: true,
    default: TYPE_DEFAULT.AVATAR_DEFAULT,
  },
  type: { type: String, require: true, default: "" },
});

export interface IHub extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  image: string;
  avatar: string;
  type: string;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IHubModel extends mongoose.Model<IHub> {
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

HubSchema.plugin(paginate);
HubSchema.plugin(aggregatePaginate);

HubSchema.index({
  name: "text",
});

const model = mongoose.model<IHub, IHubModel>("Hub", HubSchema);
export { model as Hub };
