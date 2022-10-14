import mongoose from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";

import { Song, User, Country, Type } from "../../models";
import { songQuery } from "../../queries";

import { ISongService } from "./interface";
import { SongErrorMessage } from "../../messages/error/song/index";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import fileService from "../file/file";
import { SongSuccessMessage } from "../../messages/success/song/";

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
        fileService.delete(createSongRequestDTO.audio);
        fileService.delete(createSongRequestDTO.image);
        return Promise.reject(new Error(errors[0]));
      }

      const song = await Song.create(createSongRequestDTO);
      return Promise.resolve(song);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (request) => {
    try {
      const song = await Song.findOne({ _id: request.id }).exec();
      if (!song)
        return Promise.reject(new Error(SongErrorMessage.SONG_NOT_FOUND));

      if (request.name) song.name = request.name;
      if (request.image) song.image = request.image;
      if (request.artistId) song.artistId = request.artistId;
      if (request.countryId) song.countryId = request.countryId;
      if (request.audio) song.audio = request.audio;
      if (request.originAlbumId) song.originAlbumId = request.originAlbumId;
      if (request.albumIds) song.albumIds = request.albumIds;
      if (request.typeIds) song.typeIds = request.typeIds;

      await song.saveAsync();
      return Promise.resolve(SongSuccessMessage.UPDATE_SONG_SUCCESS);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      const song = await Song.findOne({ _id: id });
      if (!song)
        return Promise.reject(new Error(SongErrorMessage.SONG_NOT_FOUND));
      await song.delete();
      return Promise.resolve(SongSuccessMessage.DELETE_SONG_SUCCESS);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export { songService };
