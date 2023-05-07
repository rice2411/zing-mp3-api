import mongoose, { Types } from "mongoose";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  image: {
    type: String,
    require: true,
  },
});
export interface IBanner extends mongoose.Document {
  _id: Types.ObjectId;
  image: String;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IBannerModel extends mongoose.Model<IBanner> {
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

BannerSchema.plugin(paginate);
BannerSchema.plugin(aggregatePaginate);

const model = mongoose.model<IBanner, IBannerModel>("Banner", BannerSchema);

export { model as Banner };
