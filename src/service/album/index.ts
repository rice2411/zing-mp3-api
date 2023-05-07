import mongoose from "mongoose";
import { BaseErrorMessage } from "../../messages/error/base";

import tokenService from "../token";
import env from "../../../config/env";
import { Artist } from "../../models/artist";

import { IAlbumService } from "./interface";
import { Album, Hub, Song, User } from "../../models";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { Library } from "../../models/library";
import AlbumResponseDTO from "../../dtos/response/album/albumResponseDTO";
import { ApiPaginateResult } from "../../helpers";

const albumService: IAlbumService = {
  getAll: async (searchParams, options) => {
    const query = searchParams;
    const searchQuery = options.search
      ? { $text: { $search: `\"${options.search}\"` } }
      : {};
    const sortQuery = { createdAt: -1 };
    const aggregates = Album.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    const albums: any = await Album.aggregatePaginateCustom(aggregates, {
      page: options.page,
      limit: options.limit,
    });
    albums.docs = await Promise.all(
      albums?.docs.map(async (album) => {
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
          description: album.description,
        });
        return newAlbum;
      })
    );
    const paginateResult = new ApiPaginateResult(albums).toRESPONSE();

    return Promise.resolve(paginateResult);
  },
  getNeighbourAlbum: async (typeId: string) => {
    const queryAlbum = {
      typeIds: { $in: [new mongoose.Types.ObjectId(typeId)] },
    };
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
    return Promise.resolve(albumWithArtist);
  },
  getDetailAlbum: async (id: string) => {
    const query = {
      _id: new mongoose.Types.ObjectId(id),
    };
    const album: any = await Album.findOne(query);
    if (album.type == "album") {
      const querySong = {
        originAlbumId: new mongoose.Types.ObjectId(id),
      };
      const queryArtist = {
        _id: new mongoose.Types.ObjectId(album.artistId[0]),
      };

      const artist = await Artist.findOne(queryArtist);
      const songOfAlbum = await Song.find(querySong);
      const songWithAritist = await Promise.all(
        songOfAlbum.map(async (song) => {
          const artist = await Artist.findOne({ _id: song.artistId });
          const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
          return newSong;
        })
      );

      const response = new AlbumResponseDTO().responseDTOFullAlbum(
        album,
        songWithAritist,
        artist
      );

      return Promise.resolve(response);
    } else if (album.type == "custom") {
      const querySong = {
        albumIds: { $in: [new mongoose.Types.ObjectId(album._id)] },
      };
      const queryArtist = {
        _id: new mongoose.Types.ObjectId(album.artistId[0]),
      };

      const artist = await User.findOne(queryArtist);
      const songOfAlbum = await Song.find(querySong);
      const songWithAritist = await Promise.all(
        songOfAlbum.map(async (song) => {
          const artist = await Artist.findOne({ _id: song.artistId });
          const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
          return newSong;
        })
      );

      const response = new AlbumResponseDTO().responseDTOFullAlbum(
        album,
        songWithAritist,
        artist
      );

      return Promise.resolve(response);
    } else {
      return Promise.resolve(album);
    }
  },
  getSuggestType: async (type: string) => {
    const queryType = { name: { $regex: type, $options: "i" } };

    const hub = await Hub.findOne(queryType);
    // const arrayIdsRock = [
    //   new mongoose.Types.ObjectId("67ba793229c2360f0cb744b9"),
    //   new mongoose.Types.ObjectId("67ba793229c3360f0cb744b9"),
    //   new mongoose.Types.ObjectId("67ba793239c2360f0cb744b9"),
    //   new mongoose.Types.ObjectId("67ba793239c2360f0cb745b9"),
    //   new mongoose.Types.ObjectId("62ba690129c1360f0cb734b2"),
    // ];
    // const arrayIdsRap = [
    //   new mongoose.Types.ObjectId("67ba893239c2360f0cb745b9"),
    //   new mongoose.Types.ObjectId("67ba893239c3360f0cb755b9"),
    //   new mongoose.Types.ObjectId("67ba893239c3360f0cb745b9"),
    //   new mongoose.Types.ObjectId("67ba893239c3361f0cb745b9"),
    //   new mongoose.Types.ObjectId("67ba893239c3361f1cb745b9"),
    // ];
    const Albums = await Album.find({
      typeIds: { $in: [new mongoose.Types.ObjectId(hub._id)] },
    });
    const result = await Promise.all(
      Albums.map(async (Album) => {
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
    return Promise.resolve(result);
  },
  getTop100: async () => {
    const arrayIds = [
      new mongoose.Types.ObjectId("63ba692129c1360f1cb744b8"),
      new mongoose.Types.ObjectId("64ba696129c1361f2cb755b8"),
      new mongoose.Types.ObjectId("65ba695129c1360f4cb765b8"),
      new mongoose.Types.ObjectId("66ba694229c1360f4cb757b9"),
      new mongoose.Types.ObjectId("67ba693229c2360f0cb744b9"),
    ];
    const Albums = await Album.find({ _id: { $in: arrayIds } });
    const result = await Promise.all(
      Albums.map(async (Album) => {
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
    return Promise.resolve(result);
  },
  getDailyTopic: async () => {
    const arrayIds = [
      new mongoose.Types.ObjectId("63ba690129c1360f0cb734b8"),
      new mongoose.Types.ObjectId("64ba691129c1360f0cb735b8"),
      new mongoose.Types.ObjectId("65ba692129c1360f0cb764b8"),
      new mongoose.Types.ObjectId("66ba692229c1360f0cb737b8"),
      new mongoose.Types.ObjectId("67ba692229c1360f0cb734b9"),
    ];
    const arrayIds2 = [
      new mongoose.Types.ObjectId("63ba691129c1360f0cb734b8"),
      new mongoose.Types.ObjectId("64ba696129c1360f0cb735b8"),
      new mongoose.Types.ObjectId("65ba695129c1360f0cb764b8"),
      new mongoose.Types.ObjectId("66ba694229c1360f0cb737b8"),
      new mongoose.Types.ObjectId("67ba693229c1360f0cb734b9"),
    ];
    const arrayIds3 = [
      new mongoose.Types.ObjectId("63ba692129c1360f1cb734b8"),
      new mongoose.Types.ObjectId("64ba696129c1361f2cb735b8"),
      new mongoose.Types.ObjectId("65ba695129c1360f4cb764b8"),
      new mongoose.Types.ObjectId("66ba694229c1360f4cb757b8"),
      new mongoose.Types.ObjectId("67ba693229c1360f0cb744b9"),
    ];
    const Albums = await Album.find({ _id: { $in: arrayIds } });

    const result1 = await Promise.all(
      Albums.map(async (Album) => {
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
    const Albums2 = await Album.find({ _id: { $in: arrayIds2 } });
    const result2 = await Promise.all(
      Albums2.map(async (Album) => {
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
    const Albums3 = await Album.find({ _id: { $in: arrayIds3 } });
    const result3 = await Promise.all(
      Albums3.map(async (Album) => {
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
    const result = [
      {
        id: 1,
        topic: "Tình Yêu  Thật Điêu",
        data: [...result1],
      },
      {
        id: 2,
        topic: `Nghệ sĩ "in love" ❤️`,
        data: [...result2],
      },
      {
        id: 3,
        topic: `Nhạc mới mỗi ngày`,
        data: [...result3],
      },
    ];

    return Promise.resolve(result);
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

    const response = await Promise.all(
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

    return Promise.resolve(response);
  },
  getSuggestAlbum: async () => {
    const arrayIds = [
      new mongoose.Types.ObjectId("62ba690129c1360f0cb734b8"),
      new mongoose.Types.ObjectId("62ba691129c1360f0cb735b8"),
      new mongoose.Types.ObjectId("62ba692129c1360f0cb764b8"),
      new mongoose.Types.ObjectId("62ba692229c1360f0cb737b8"),
      new mongoose.Types.ObjectId("62ba692229c1360f0cb734b9"),
    ];
    const Albums = await Album.find({ _id: { $in: arrayIds } });

    const response = await Promise.all(
      Albums.map(async (Album) => {
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

    return Promise.resolve(response);
  },
};

export { albumService };
