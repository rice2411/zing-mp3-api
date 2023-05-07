import { PAGING_DEFAULT } from "../../constants/paging";

const mongoosePaginate = require("mongoose-paginate-v2");

module.exports = function paginate(schema, options) {
  schema.plugin(mongoosePaginate);
  schema.statics.paginateCustom = function paginateQuery(query, paginate) {
    let options: any = {
      page: paginate.page || 1,
      limit: paginate.limit || PAGING_DEFAULT.LIMIT,
    };
    return this.paginate(query, options);
  };
};
