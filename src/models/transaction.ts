import { string } from "joi";
import mongoose, { Types } from "mongoose";

const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    app_trans_id: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    value: {
      type: Number,
      require,
    },
    status: {
      type: Number,
      require,
    },
    description: {
      type: String,
      require,
    },
  },
  { timestamps: true }
);

export interface ITransaction extends mongoose.Document {
  _id: Types.ObjectId;
  app_trans_id?: string;
  userId?: mongoose.Types.ObjectId;
  value?: Number;
  status?: Number;
  description?: String;

  saveAsync(): any;
  removeAsync(): any;
}

export interface ITransactionModel extends mongoose.Model<ITransaction> {
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

TransactionSchema.plugin(paginate);
TransactionSchema.plugin(aggregatePaginate);

TransactionSchema.index({
  app_trans_id: "text",
  description: "text",
  value: "text",
});

const model = mongoose.model<ITransaction, ITransactionModel>(
  "Transaction",
  TransactionSchema
);
export { model as Transaction };
