import QueryOptions from "../dtos/QueryOptions";
import { ApiPaginateResult } from "../helpers/PaginateResult";
import { Song } from "../models/song";
import SongResponseDTO from "../dtos/response/song/SongResponseDTO";

export interface ISongQuery {
  getAll: (searchParams: object, options: QueryOptions) => Promise<any>;
  getById: (searchParams: object) => Promise<any>;
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
        ...searchQuery,
      })
      .sort(sortQuery);

    if (options.is_paginate) {
      const songs: any = await Song.aggregatePaginateCustom(aggregates, {
        page: options.page,
        limit: options.limit,
      });

      songs.docs = songs?.docs.map((song) =>
        new SongResponseDTO().responseDTO(song)
      );
      const paginateResult = new ApiPaginateResult(songs).toRESPONSE();
      return paginateResult;
    }
    return aggregates;
  },
  async getById(searchParams: object) {
    const query = searchParams;
    const song = await Song.aggregate().match({ ...query });
    return song.length ? song[0] : null;
  },
};

export { songQuery };
