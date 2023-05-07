import mongoose, { Types } from "mongoose";
import { TYPE_DEFAULT } from "../constants/model/type";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const ChartSchema = new Schema(
  {
    day: {
      type: String,
      require: true,
    },

    data: {
      type: Array<any>,
      required: true,
    },
  },
  { timestamps: true }
);

export interface IChart extends mongoose.Document {
  _id: Types.ObjectId;
  day: String;
  data: Array<any>;
  saveAsync(): any;
  removeAsync(): any;
}

export interface IChartModel extends mongoose.Model<IChart> {
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

ChartSchema.plugin(paginate);
ChartSchema.plugin(aggregatePaginate);

const model = mongoose.model<IChart, IChartModel>("Chart", ChartSchema);
export { model as Chart };
