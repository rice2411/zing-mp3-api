import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Types } from "mongoose";
import { BaseErrorMessage } from "../../../messages/error/base";
import { Transaction, User } from "../../../models";
import { Banner } from "../../../models/banner";
import { ITransactionService } from "./interface";
import { ApiPaginateResult } from "../../../helpers";

const transactionService: ITransactionService = {
  create: async (param) => {
    const transactionFounded = await Transaction.findOne({
      app_trans_id: param.app_trans_id,
    });
    if (transactionFounded) return;
    const transaction = new Transaction(param);
    const transactionrSave = await transaction.saveAsync();

    return Promise.resolve(transactionrSave);
  },

  getAll: async (searchParams, options) => {
    // const transactions = await Transaction.find({});
    // const result = await Promise.all(
    //   transactions.map(async (transaction) => {
    //     const user = await User.findOne({
    //       _id: new mongoose.Types.ObjectId(transaction.userId),
    //     });
    //     const newTrans = { transaction: transaction, user: user };
    //     return newTrans;
    //   })
    // );

    const query = searchParams;
    const searchQuery = options.search
      ? { $text: { $search: `\"${options.search}\"` } }
      : {};
    const sortQuery = { createdAt: -1 };
    const aggregates = User.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    const transactions: any = await Transaction.aggregatePaginateCustom(
      aggregates,
      {
        page: options.page,
        limit: options.limit,
      }
    );
    transactions.docs = await Promise.all(
      transactions?.docs.map(async (transaction) => {
        const user = await User.findOne({
          _id: new mongoose.Types.ObjectId(transaction.userId),
        });
        const newTrans = { transaction: transaction, user: user };
        return newTrans;
      })
    );
    const paginateResult = new ApiPaginateResult(transactions).toRESPONSE();

    return Promise.resolve(paginateResult);
  },
};

export { transactionService };
