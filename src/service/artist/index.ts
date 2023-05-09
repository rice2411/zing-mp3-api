import mongoose from "mongoose";
import { BaseErrorMessage } from "../../messages/error/base";

import tokenService from "../token";
import env from "../../../config/env";
import { Artist } from "../../models/artist";

import AlbumResponseDTO from "../../dtos/response/album/albumResponseDTO";
import { IArtistService } from "./interface";
import { Album, Song } from "../../models";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { ApiPaginateResult } from "../../helpers";
import fileService from "../file/file";

const artistService: IArtistService = {
  update: async (request) => {
    try {
      const artist = await Artist.findOne({
        _id: new mongoose.Types.ObjectId(request.artistId),
      }).exec();
      if (!artist) Promise.reject(new Error("Không tìm thấy"));

      if (request.name) {
        artist.name = request.name;
      }

      if (request.typeIds) {
        const id = [];
        request.typeIds.map((item: any) => {
          id.push(item.value);
        });
        artist.typeIds = id;
      }

      if (request.description) {
        artist.description = request.description;
      }
      const file = request.avatar;
      if (file) {
        const response = await fileService.upload(file);
        if (response) {
          artist.avatar = response.name;
        }
      }
      const result = await artist.saveAsync();

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  delete: async (artistId) => {
    try {
      // Register success

      const artist = await Artist.findOne({
        _id: new mongoose.Types.ObjectId(artistId),
      }).exec();
      artist.isDelete = true;
      const result = artist.saveAsync();

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  create: async (request) => {
    try {
      // Register success

      const artist = new Artist(request);

      const typeIds = [];
      request.typeIds.map((item: any) => {
        typeIds.push(item.value);
      });
      artist.typeIds = typeIds;

      const file = request.avatar;
      if (file) {
        const response = await fileService.upload(file);
        if (response) {
          artist.avatar = response.name;
        }
      }

      const artistSave = await artist.saveAsync();

      return Promise.resolve(artistSave);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getAll: async (searchParams, options) => {
    const query = searchParams;
    const searchQuery = options.search
      ? { name: { $regex: options.search, $options: "i" } }
      : {};
    const sortQuery = { createdAt: -1 };
    const aggregates = Artist.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    const artists: any = await Artist.aggregatePaginateCustom(aggregates, {
      page: options.page,
      limit: options.limit,
    });
    const paginateResult = new ApiPaginateResult(artists).toRESPONSE();

    return Promise.resolve(paginateResult);
  },
  get: async (artistId: string) => {
    const result = {
      artist: {},
      outStandingSongs: [],
      albums: [],
      suggest: [],
    };
    const artist = await Artist.findById(artistId);
    if (artist.isDelete) {
      return Promise.reject(null);
    }
    const songs = await Song.find({
      artistId: new mongoose.Types.ObjectId(artistId),
    }).sort({ totalViews: -1 });

    const songWithArtist = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findOne({
          _id: new mongoose.Types.ObjectId(song.artistId),
        });

        const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
        return newSong;
      })
    );
    const albums = await Album.find({
      artistId: { $in: [new mongoose.Types.ObjectId(artistId)] },
    }).sort({ publicationYear: -1 });
    const albumWithArtist = await Promise.all(
      albums.map(async (album: any) => {
        const newAlbum = new AlbumResponseDTO();
        newAlbum.responseDTOAlbum({
          _id: album._id,
          name: album.name,
          image: album.image,
          authors: [artist],
          description: "",
          type: album.type,
        });
        return newAlbum;
      })
    );
    const total = await Artist.countDocuments();
    const skip = Math.floor(Math.random() * total) + 1;
    const suggest: any = await Artist.find({
      _id: { $ne: new mongoose.Types.ObjectId(artist._id) },
    })
      .skip(skip)
      .limit(5)
      .exec();
    result.artist = artist;
    result.suggest = suggest;
    result.outStandingSongs = songWithArtist.slice(0, 6);
    result.albums = albumWithArtist;
    return Promise.resolve(result);
  },
  appearIn: async (artistId: string) => {
    const queryArtist = { _id: new mongoose.Types.ObjectId(artistId) };

    const queryAlbum = {
      artistId: { $in: [new mongoose.Types.ObjectId(artistId)] },
    };
    const artist = await Artist.findOne(queryArtist);
    const album = await Album.find(queryAlbum);
    const albumWithArtist = await Promise.all(
      album.map(async (Album) => {
        const artists = await Promise.all(
          Album.artistId.map(async (artistId) => {
            const artistQuery = {
              _id: artistId,
            };
            const artist = await Artist.findOne(artistQuery);
            return artist;
          })
        );
        const newAlbum = new AlbumResponseDTO();
        newAlbum.responseDTOAlbum({
          _id: Album._id,
          name: Album.name,
          image: Album.image,
          authors: artists,
          description: "",
        });
        return newAlbum;
      })
    );
    const result = { artist: artist, album: albumWithArtist };
    return Promise.resolve(result);
  },
};

export { artistService };
