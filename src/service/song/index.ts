import mongoose from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";

import { Song } from "../../models";
import { songQuery } from "../../queries";

import { ISongService } from "./interface";
import { SongErrorMessage } from "../../messages/error/song/index";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import CreateSongRequestDTO from "../../dtos/request/song/CreateSongRequestDTO";

const songService: ISongService = {
  list: async (options: QueryOptions) => {
    const query = {};
    const songs = await songQuery.getAll(query, options);
    return Promise.resolve(songs);
  },
  get: async (id) => {
    try {
      const query = { _id: new mongoose.Types.ObjectId(id) };

      const song = await songQuery.getById(query);
      if (!song)
        return Promise.reject(new Error(SongErrorMessage.SONG_NOT_FOUND));

      const songs = await Song.find({
        albumIds: song.originAlbumId,
        _id: { $ne: song._id },
      });
      const response = {
        song: new SongResponseDTO().responseDTO(song),
        songs: songs.map((song) => new SongResponseDTO().responseDTO(song)),
      };
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  create: async (createSongRequestDTO) => {
    try {
      const song = await Song.create(createSongRequestDTO);
      return Promise.resolve(createSongRequestDTO);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { songService };
