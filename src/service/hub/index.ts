import { BaseErrorMessage } from "../../messages/error/base";
import mongoose from "mongoose";
import { Album, Hub, Song } from "../../models";
import { IHubSerivce } from "./interface";
import { Artist } from "../../models/artist";
import AlbumResponseDTO from "../../dtos/response/album/albumResponseDTO";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";

const hubService: IHubSerivce = {
  getAll: async () => {
    const hubs = await Hub.find({});

    return Promise.resolve(hubs);
  },
  get: async (hubId: string) => {
    const response = {
      hub: {},
      outStanding: [],
      hotSongs: [],
      albums: [],
      artists: [],
    };
    const hub = await Hub.findOne({ _id: new mongoose.Types.ObjectId(hubId) });
    const songs = await Song.find({ typeIds: { $in: [hub._id] } })
      .sort({
        likes: -1,
      })
      .limit(15);
    const songsWithAritist = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findOne({ _id: song.artistId });
        const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
        return newSong;
      })
    );
    const albumsHot = await Album.find({ typeIds: { $in: [hub._id] } })
      .sort({
        likes: -1,
      })
      .limit(5);
    const albumsHotWithArtist = await Promise.all(
      albumsHot.map(async (Album) => {
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
          description: Album.description,
        });
        return newAlbum;
      })
    );
    const albums = await Album.find({ typeIds: { $in: [hub._id] } })
      .sort({
        publicationYear: -1,
      })
      .limit(5);
    const albumstWithArtist = await Promise.all(
      albums.map(async (Album) => {
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
          description: Album.description,
        });
        return newAlbum;
      })
    );
    const total = await Artist.countDocuments();
    const skip = Math.floor(Math.random() * total) + 1;
    const artists: any = await Artist.find({
      typeIds: { $in: [hub._id] },
    })
      .skip(skip)
      .limit(5)
      .exec();
    response.hub = hub;
    response.outStanding = albumsHotWithArtist;
    response.hotSongs = songsWithAritist;
    response.albums = albumstWithArtist;
    response.artists = artists;
    return Promise.resolve(response);
  },
};

export { hubService };
