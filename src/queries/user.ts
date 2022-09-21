import QueryOptions from "../dtos/QueryOptions";
import UserResponseDTO from "../dtos/response/user/UserResponseDTO";
import { ApiPaginateResult } from "../helpers/PaginateResult";
import { User } from "../models/user";

export interface IUserQuery {
  getAllUser: (searchParams: object, options: QueryOptions) => Promise<any>;
  getByCondition: (searchParams: object) => Promise<any>;
  getById: (searchParams: object) => Promise<any>;
}

const userQuery: IUserQuery = {
  async getByCondition(searchParams) {
    const user = await (<any>User.findOne(searchParams).lean()).execAsync();
    return user;
  },

  async getAllUser(searchParams: object, options: QueryOptions) {
    const query = searchParams;
    const searchQuery = options.search
      ? { $text: { $search: `\"${options.search}\"` } }
      : {};
    const sortQuery = { created_at: -1 };
    const aggregates = User.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    if (!!options.is_paginate) {
      const users: any = await User.aggregatePaginateCustom(aggregates, {
        page: options.page,
        limit: options.limit,
      });
      users.docs = users?.docs.map((user) =>
        new UserResponseDTO().responseDTO(user)
      );
      const paginateResult = new ApiPaginateResult(users).toRESPONSE();

      return paginateResult;
    }
    return aggregates;
  },

  async getById(searchParams: object) {
    const query = searchParams;
    const user = await User.aggregate().match({ ...query });
    return user.length ? user[0] : null;
  },
};

export { userQuery };
