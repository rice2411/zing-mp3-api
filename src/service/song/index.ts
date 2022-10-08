import mongoose from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";

import { Song, User, Country, Type } from "../../models";
import { songQuery } from "../../queries";

import { ISongService } from "./interface";
import { SongErrorMessage } from "../../messages/error/song/index";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { deleteImageFile, configFilePath } from "../helper/file";

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
      let errors = [];
      const artist = await User.findOne({ _id: createSongRequestDTO.artistId });
      if (!artist) errors.push(SongErrorMessage.ARTIST_IS_NOT_EXIST);

      const country = await Country.findOne({
        _id: createSongRequestDTO.countryId,
      });
      if (!country) errors.push(SongErrorMessage.COUNTRY_IS_NOT_EXIST);

      for (const typeId of createSongRequestDTO.typeIds) {
        if (!(await Type.findOne({ _id: typeId })))
          errors.push(SongErrorMessage.TYPE_IS_NOT_EXIST);
      }

      if (errors.length) {
        return Promise.reject(new Error(errors[0]));
      }

      const song = await Song.create(createSongRequestDTO);
      return Promise.resolve(song);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { songService };
