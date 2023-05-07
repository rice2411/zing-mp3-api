import { PAGING_DEFAULT } from "../../constants/paging";

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

module.exports = function paginate(schema, options) {
  schema.plugin(aggregatePaginate);
  schema.statics.aggregatePaginateCustom = function paginateQuery(
    query,
    paginate
  ) {
    let options: any = {
      page: paginate.page || 1,
      limit: paginate.limit || PAGING_DEFAULT.LIMIT,
    };
    return this.aggregatePaginate(query, options);
  };
};
