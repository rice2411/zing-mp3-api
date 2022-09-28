import mongoose, { Types } from "mongoose";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  flag: {
    type: String,
    required: true,
  },
});

export interface ICountry extends mongoose.Document {
  _id: Types.ObjectId;
  name: string;
  flag: string;
  saveAsync(): any;
  removeAsync(): any;
}

export interface ICountryModel extends mongoose.Model<ICountry> {
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

CountrySchema.plugin(paginate);
CountrySchema.plugin(aggregatePaginate);

CountrySchema.index({
  name: "text",
});

const model = mongoose.model<ICountry, ICountryModel>("Country", CountrySchema);
export { model as Country };
