import mongoose, { Types } from "mongoose";
import { TYPE_DEFAULT } from "../constants/model/type";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
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
});

export interface IType extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  image: string;
  avatar: string;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ITypeModel extends mongoose.Model<IType> {
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

TypeSchema.plugin(paginate);
TypeSchema.plugin(aggregatePaginate);

TypeSchema.index({
  name: "text",
});

const model = mongoose.model<IType, ITypeModel>("Type", TypeSchema);
export { model as Type };
