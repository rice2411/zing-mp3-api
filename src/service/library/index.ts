import env from "../../../config/env";
import AlbumResponseDTO from "../../dtos/response/album/albumResponseDTO";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { BaseErrorMessage } from "../../messages/error/base";
import { Album, Song } from "../../models";
import { Artist } from "../../models/artist";
import { Library } from "../../models/library";
import tokenService from "../token";
import { ILibaryService } from "./interface";
import mongoose from "mongoose";

const libraryService: ILibaryService = {
  removePlaylist: async (request, playlistId) => {
    try {
      const token = request.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);

      const query = {
        userId: info._id,
      };

      const library = await Library.findOne(query);
      const index = library.recentAlbums.indexOf(
        new mongoose.Types.ObjectId(playlistId)
      );
      if (index !== -1) {
        library.recentAlbums.splice(index, 1);
      }
      library.saveAsync();
      const songs = await Song.find({});
      songs.map((song) => {
        if (song.albumIds.includes(new mongoose.Types.ObjectId(playlistId))) {
          const index = song.albumIds.indexOf(
            new mongoose.Types.ObjectId(playlistId)
          );
          if (index !== -1) {
            song.albumIds.splice(index, 1);
          }
          song.saveAsync();
        }
      });
      const playlist = await Album.findOne({
        _id: new mongoose.Types.ObjectId(playlistId),
      });
      playlist.remove();
      const result = playlist.remove();

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  removeSongOutOfPlaylist: async (songId, playlistId) => {
    try {
      const song = await Song.findOne({
        _id: new mongoose.Types.ObjectId(songId),
      });
      const index = song.albumIds.indexOf(
        new mongoose.Types.ObjectId(playlistId)
      );
      if (index !== -1) {
        song.albumIds.splice(index, 1);
      }

      const result = song.saveAsync();

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  addSongToPlaylist: async (songId, playlistId) => {
    try {
      const song = await Song.findOne({
        _id: new mongoose.Types.ObjectId(songId),
      });
      if (!song.albumIds.includes(new mongoose.Types.ObjectId(playlistId)))
        song.albumIds.push(new mongoose.Types.ObjectId(playlistId));

      const result = song.saveAsync();

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getOwnPlaylist: async (request) => {
    try {
      const token = request.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);

      const playlist = await Album.find({
        $and: [
          { artistId: { $in: [new mongoose.Types.ObjectId(info._id)] } },
          { type: "custom" },
        ],
      });

      return Promise.resolve(playlist);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  removeSongOutOfPlayingList: async (request, songId) => {
    try {
      const token = request.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);

      const library = await Library.findOne({
        userId: new mongoose.Types.ObjectId(info._id),
      });
      const index = library.playlist.indexOf(
        new mongoose.Types.ObjectId(songId)
      );
      if (index !== -1) {
        library.playlist.splice(index, 1);
      }
      library.saveAsync();
      return Promise.resolve(library);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  addToPlayingList: async (request, songId) => {
    try {
      const token = request.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);

      const library = await Library.findOne({
        userId: new mongoose.Types.ObjectId(info._id),
      });
      library.playlist.push(new mongoose.Types.ObjectId(songId));

      library.saveAsync();
      const song = await Song.findById(songId);
      const artist = await Artist.findOne({
        _id: new mongoose.Types.ObjectId(song.artistId),
      });

      const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
      return Promise.resolve(newSong);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  createPlaylist: async (request, param) => {
    try {
      const token = request.headers.authorization.split(" ")[1].trim();
      const info = tokenService.verifyToken(token, env.jwt.secret);
      const playlist = new Album(param);
      playlist.artistId = [new mongoose.Types.ObjectId(info._id)];
      playlist.type = "custom";
      const playlistSave = await playlist.saveAsync();
      return Promise.resolve(playlistSave);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getPlaylist: async (request) => {
    const token = request.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const library = await Library.findOne({
      userId: new mongoose.Types.ObjectId(info._id),
    });
    const songs = await Promise.all(
      library.playlist.map(async (songId) => {
        const song = await Song.findById(songId);
        const artist = await Artist.findOne({
          _id: new mongoose.Types.ObjectId(song.artistId),
        });
        const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
        return newSong;
      })
    );

    return Promise.resolve(songs);
  },
  playingNewPlaylist: async (request, albumId) => {
    const token = request.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);
    const library = await Library.findOne({
      userId: new mongoose.Types.ObjectId(info._id),
    });
    if (albumId) {
      const songs = await Song.find({
        $or: [
          { originAlbumId: new mongoose.Types.ObjectId(albumId) },
          { albumIds: { $in: [new mongoose.Types.ObjectId(albumId)] } },
        ],
      });
      const songIds = songs.map((song: any) => song._id);

      library.playlist = songIds;
      const librarySave = await library.saveAsync();
      return Promise.resolve(librarySave);
    }
  },
  createNew: async (userId) => {
    const newLibrary = {
      userId: new mongoose.Types.ObjectId(userId),
    };
    const library = new Library(newLibrary);
    const librarySave = await library.saveAsync();

    return Promise.resolve(librarySave);
  },
  get: async (req) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const userId = new mongoose.Types.ObjectId(info._id);
    const query = { userId: userId };
    const library = await Library.findOne(query);
    const playlist = await Album.find({
      artistId: { $in: [new mongoose.Types.ObjectId(info._id)] },
    });
    const ownPlaylistWithArtist = await Promise.all(
      playlist.map(async (item: any) => {
        const newAlbum = new AlbumResponseDTO();
        newAlbum.responseDTOAlbum({
          _id: item._id,
          name: item.name,
          image: item.image,
          authors: [
            { _id: info._id, name: info.first_name + " " + info.last_name },
          ],
          description: "",
          publicationYear: item.publicationYear,
          type: item.type,
        });
        return newAlbum;
      })
    );

    const artists = await Promise.all(
      library.likedArtists.map(async (aritstId: any) => {
        const aritst = await Artist.findOne({
          _id: new mongoose.Types.ObjectId(aritstId),
        });
        return aritst;
      })
    );
    const albums = await Promise.all(
      library.likedAlbums.map(async (albumId: any) => {
        const album = await Album.findOne({
          _id: new mongoose.Types.ObjectId(albumId),
        });
        return album;
      })
    );
    const albumWithArtist = await Promise.all(
      albums.map(async (album: any) => {
        const artists = await Promise.all(
          album.artistId.map(async (artistId) => {
            const artistQuery = {
              _id: artistId,
            };
            const artist = await Artist.findOne(artistQuery);
            return artist;
          })
        );
        const newAlbum = new AlbumResponseDTO();
        newAlbum.responseDTOAlbum({
          _id: album._id,
          name: album.name,
          image: album.image,
          authors: artists,
          description: "",
          publicationYear: album.publicationYear,
          type: album.type,
        });
        return newAlbum;
      })
    );
    const songs = await Promise.all(
      library.likedSongs.map(async (songId: any) => {
        const song = await Song.findOne({
          _id: new mongoose.Types.ObjectId(songId),
        });
        return song;
      })
    );
    const songWithFullInfo = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findOne({
          _id: new mongoose.Types.ObjectId(song.artistId),
        });
        const album = await Album.findOne({
          _id: new mongoose.Types.ObjectId(song.originAlbumId),
        });
        const newSong = new SongResponseDTO().responseSimpleDTO(
          song,
          artist,
          album
        );
        return newSong;
      })
    );
    library.likedSongs = songWithFullInfo;
    library.likedArtists = artists;
    library.likedAlbums = [...ownPlaylistWithArtist, ...albumWithArtist];

    return Promise.resolve(library);
  },
  likeArtist: async (req, artistId) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const aritst: any = await Artist.findOne({
      _id: new mongoose.Types.ObjectId(artistId),
    });

    const userId = new mongoose.Types.ObjectId(info._id);
    const query = { userId: userId };
    const library = await Library.findOne(query);
    if (!aritst.followers.includes(userId)) {
      aritst.followers.push(userId);
      library.likedArtists.push(artistId);
    } else {
      const index = aritst.followers.indexOf(userId);
      if (index > -1) {
        aritst.followers.splice(index, 1);
      }
      const index2 = library.likedArtists.indexOf(artistId);

      if (index2 > -1) {
        library.likedArtists.splice(index2, 1);
      }
    }
    library.save();
    const response = aritst.save();
    return Promise.resolve(response);
  },
  likeAlbum: async (req, albumId) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const album = await Album.findOne({
      _id: new mongoose.Types.ObjectId(albumId),
    });

    const userId = new mongoose.Types.ObjectId(info._id);
    const query = { userId: userId };
    const library = await Library.findOne(query);
    if (!album.followers.includes(userId)) {
      album.likes = Number(album.likes) + 1;
      album.followers.push(userId);
      library.likedAlbums.push(albumId);
    } else {
      const index = album.followers.indexOf(userId);
      if (index > -1) {
        album.followers.splice(index, 1);
        album.likes = Number(album.likes) - 1;
        const index2 = library.likedAlbums.indexOf(albumId);

        if (index2 > -1) {
          library.likedAlbums.splice(index2, 1);
        }
      }
    }
    library.save();
    const response = album.save();
    return Promise.resolve(response);
  },
  likeSong: async (req, songId) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const song = await Song.findOne({
      _id: new mongoose.Types.ObjectId(songId),
    });

    const userId = new mongoose.Types.ObjectId(info._id);
    const query = { userId: userId };
    const library = await Library.findOne(query);
    if (!song.followers.includes(userId)) {
      song.likes = Number(song.likes) + 1;
      song.followers.push(userId);
      library.likedSongs.push(songId);
    } else {
      const index = song.followers.indexOf(userId);
      if (index > -1) {
        song.followers.splice(index, 1);
        song.likes = Number(song.likes) - 1;
        const index2 = library.likedSongs.indexOf(songId);

        if (index2 > -1) {
          library.likedSongs.splice(index2, 1);
        }
      }
    }
    library.save();
    const response = song.save();
    return Promise.resolve(response);
  },
  addAlbumHistory: async (req, albumId) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const query = {
      userId: info._id,
    };
    const _id = new mongoose.Types.ObjectId(albumId);
    const library = await Library.findOne(query);
    if (!library.recentAlbums.includes(_id)) {
      library.recentAlbums.push(_id);
    } else {
      const index = library.recentAlbums.indexOf(_id);
      const data = library.recentAlbums[index];
      library.recentAlbums.splice(index, 1);
      library.recentAlbums.push(data);
    }
    const resposne = library.save();
    return Promise.resolve(resposne);
  },
  getRecentAlbum: async (req: any) => {
    const token = req.headers.authorization.split(" ")[1].trim();
    const info = tokenService.verifyToken(token, env.jwt.secret);

    const query = {
      userId: info._id,
    };
    const library = await Library.findOne(query);
    const recentAlbums = library.recentAlbums;
    if (!recentAlbums)
      return Promise.reject(new Error(BaseErrorMessage.SOME_THING_WENT_WRONG));

    const response: any = await Promise.all(
      recentAlbums
        .map(async (AlbumId) => {
          const AlbumQuery = {
            _id: new mongoose.Types.ObjectId(AlbumId),
          };
          const album = await Album.findOne(AlbumQuery);

          return album;
        })
        .reverse()
    );

    return Promise.resolve(response.slice(0, 7));
  },
};

export { libraryService };
