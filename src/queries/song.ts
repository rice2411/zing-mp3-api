import QueryOptions from "../dtos/QueryOptions";
import { ApiPaginateResult } from "../helpers/PaginateResult";
import { Song } from "../models/song";
import SongResponseDTO from "../dtos/response/song/SongResponseDTO";

export interface ISongQuery {
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
}

const songQuery: ISongQuery = {
  async getAll(searchParams: object, options: QueryOptions) {
    const query = searchParams;
    const searchQuery = options.search
      ? { $text: { $search: `\"${options.search}\"` } }
      : {};
    const sortQuery = { created_at: -1 };
    const aggregates = Song.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    console.log(aggregates);
    if (!!options.is_paginate) {
      const songs: any = await Song.aggregatePaginateCustom(aggregates, {
        page: options.page,
        limit: options.limit,
      });
      console.log(songs);
      songs.docs = songs?.docs.map((song) =>
        new SongResponseDTO().responseDTO(song)
      );
      const paginateResult = new ApiPaginateResult(songs).toRESPONSE();
      return paginateResult;
    }
    return aggregates;
  },
};

export { songQuery };
