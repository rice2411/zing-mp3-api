import mongoose from "mongoose";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { Album, Hub, Song } from "../../models";
import { Artist } from "../../models/artist";
import { ISearchService } from "./interface";
import AlbumResponseDTO from "../../dtos/response/album/albumResponseDTO";
import { query } from "express";

export const searchService: ISearchService = {
  searchFull: async (option: any) => {
    // const stringSimilarity = require("string-similarity");

    const words = option.search.split(" ");

    const searchResult = {
      outStanding: [],
      songs: [],
      albums: [],
      artists: {},
    };

    const queryResult: any = await searchService.queryAll(option.search);
    const { songs, albums, artists, hubs } = queryResult;
    const moreQuery = {
      $or: [
        {
          $and: [
            {
              artistId: {
                $in: [
                  new mongoose.Types.ObjectId(
                    songs[0]?.artist?._id ||
                      artists[0]?._id ||
                      albums[0]?.authors[0]?._id
                  ),
                ],
              },
            },
            { _id: { $ne: new mongoose.Types.ObjectId(albums[0]?._id) } },
          ],
        },
        { typeIds: { $in: [hubs[0]?._id] } },
      ],
    };
    if (option.tab == "all") {
      if (songs?.length > 0) {
        const artist = await Artist.findOne({
          _id: new mongoose.Types.ObjectId(songs[0].artist._id),
        });
        const albumFounded = await Album.find({
          artistId: {
            $in: [new mongoose.Types.ObjectId(songs[0].artist._id)],
          },
        });
        const albumWithArtist = await Promise.all(
          albumFounded.map(async (Album) => {
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
              publicationYear: Album.publicationYear,
            });
            return newAlbum;
          })
        );
        //Nổi bật
        searchResult.outStanding.push(songs[0]);
        searchResult.outStanding.push(artist);
        if (songs.length == 1) {
          if (albums.length > 0) {
            searchResult.outStanding.push(albums[0]);
          } else {
            const neighBourSong = await Song.findOne({
              originAlbumId: songs[0].originAlbumId,
            });

            const newNeighBourSong = new SongResponseDTO().responseSimpleDTO(
              neighBourSong,
              artist
            );

            searchResult.outStanding.push(newNeighBourSong);
          }
        } else {
          searchResult.outStanding.push(songs[1]);
        }
        //Bài hát
        if (songs.length < 6) {
          const neighBourSong = await Song.find({
            originAlbumId: songs[0].originAlbumId,
          });
          const newNeighBourSongWithAritist = await Promise.all(
            neighBourSong.map(async (song) => {
              const artist = await Artist.findOne({ _id: song.artistId });
              const newSong = new SongResponseDTO().responseSimpleDTO(
                song,
                artist
              );
              return newSong;
            })
          );
          searchResult.songs = [
            ...songs,
            ...newNeighBourSongWithAritist.slice(0, 5),
          ];
        } else {
          searchResult.songs = songs;
        }
        albums.length > 0
          ? (searchResult.albums = [...albums, ...albumWithArtist])
          : (searchResult.albums = [...albumWithArtist]);

        searchResult.artists = [artist];
      } else if (artists?.length > 0) {
        const querySong = {
          artistId: new mongoose.Types.ObjectId(artists[0]._id),
        };
        const queryAlbum = {
          artistId: { $in: [new mongoose.Types.ObjectId(artists[0]._id)] },
        };

        const albumFounded = await Album.find(queryAlbum);
        const albumWithArtist = await Promise.all(
          albumFounded.map(async (Album) => {
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
              publicationYear: Album.publicationYear,
            });
            return newAlbum;
          })
        );

        const songFounded = await Song.find(querySong);
        songFounded.sort((a: any, b: any) => {
          return b.totalViews - a.totalViews || b.name - a.name;
        });
        const songWithAritist = await Promise.all(
          songFounded.map(async (song) => {
            const artist = await Artist.findOne({ _id: song.artistId });
            const newSong = new SongResponseDTO().responseSimpleDTO(
              song,
              artist
            );
            return newSong;
          })
        );

        searchResult.outStanding.push(artists[0]);
        searchResult.outStanding.push(songWithAritist[0]);
        searchResult.outStanding.push(songWithAritist[1]);
        searchResult.songs = songWithAritist;
        searchResult.albums = albumWithArtist;
        searchResult.artists = artists;
      } else if (albums?.length > 0) {
        const artistQuery = {
          _id: new mongoose.Types.ObjectId(albums[0].authors[0]._id),
        };
        const artist = await Artist.findOne(artistQuery);
        const songs = await Song.find({
          originAlbumId: new mongoose.Types.ObjectId(albums[0]._id),
        });
        const songWithAritist = await Promise.all(
          songs.map(async (song) => {
            const artist = await Artist.findOne({
              _id: new mongoose.Types.ObjectId(albums[0].authors[0]._id),
            });
            const newSong = new SongResponseDTO().responseSimpleDTO(
              song,
              artist
            );
            return newSong;
          })
        );
        const queryAlbum = {
          artistId: {
            $in: [new mongoose.Types.ObjectId(albums[0].authors[0]._id)],
          },
        };
        const albumFounded = await Album.find(queryAlbum);
        const albumWithArtist = await Promise.all(
          albumFounded.map(async (Album) => {
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
              publicationYear: Album.publicationYear,
            });
            return newAlbum;
          })
        );
        searchResult.outStanding.push(albumWithArtist[0]);
        searchResult.outStanding.push(songWithAritist[0]);
        searchResult.outStanding.push(artist);
        searchResult.songs = songWithAritist;
        searchResult.albums = albumWithArtist;
        searchResult.artists = [artist];
      } else if (hubs?.length > 0) {
        const hubQuery = {
          _id: new mongoose.Types.ObjectId(hubs[0]._id),
        };
        const hub = await Hub.findOne(hubQuery);
        const query = {
          typeIds: { $in: [hub._id] },
        };

        const songs = await Song.find(query);
        const albumFounded = await Album.find(query);
        const artists = await Artist.find(query);

        const songWithAritist = await Promise.all(
          songs.map(async (song) => {
            const artist = await Artist.findOne({
              _id: new mongoose.Types.ObjectId(albums[0].authors[0]._id),
            });
            const newSong = new SongResponseDTO().responseSimpleDTO(
              song,
              artist
            );
            return newSong;
          })
        );

        const albumWithArtist = await Promise.all(
          albumFounded.map(async (Album) => {
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
              publicationYear: Album.publicationYear,
            });
            return newAlbum;
          })
        );
        searchResult.outStanding.push(hub);
        searchResult.outStanding.push(albumWithArtist[0] ?? []);
        searchResult.outStanding.push(songWithAritist[0] ?? []);
        searchResult.songs = songWithAritist;
        searchResult.albums = albumWithArtist;
        searchResult.artists = artists;
      }
    }
    if (option.tab == "songs") {
      const moreSong = await Song.find(moreQuery);

      const songWithAritist = await Promise.all(
        moreSong.map(async (song) => {
          const artist = await Artist.findOne({ _id: song.artistId });
          const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
          return newSong;
        })
      );
      searchResult.songs = [...songs, ...songWithAritist];
    }
    if (option.tab == "albums") {
      const moreAlbum = await Album.find(moreQuery);

      const albumWithArtist = await Promise.all(
        moreAlbum.map(async (Album) => {
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
            publicationYear: Album.publicationYear,
          });
          return newAlbum;
        })
      );

      searchResult.albums = [...albums, ...albumWithArtist];
    }
    if (option.tab == "artists") {
      const moreArtist = await Artist.find(moreQuery);

      searchResult.artists = [...artists, ...moreArtist];
    }
    if (songs.length == 0 && albums == 0 && artists == 0 && hubs.length == 0)
      return Promise.resolve({ error: "Không có dữ liệu" });
    return Promise.resolve(searchResult);
  },

  suggestSearch: async (search: string) => {
    const suggest: any = await searchService.queryAll(search);

    const resultSuggest = [
      ...suggest.songs,
      ...suggest.albums,
      ...suggest.artists,
      ...suggest.hubs,
    ];
    return Promise.resolve(resultSuggest);
  },
  queryAll: async (queryParam: any) => {
    const query = {
      name: { $regex: queryParam, $options: "i" },
      isDelete: false,
    };
    const hubs = await Hub.find(query);
    const songs = await Song.find(query);
    const songWithAritist = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findOne({ _id: song.artistId });
        const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
        return newSong;
      })
    );
    const albums = await Album.find(query);
    const albumWithArtist = await Promise.all(
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
          description: "",
          publicationYear: Album.publicationYear,
        });
        return newAlbum;
      })
    );
    const artists = await Artist.find(query);

    const result = {
      songs: songWithAritist,
      albums: albumWithArtist,
      artists: artists,
      hubs: hubs,
    };

    return Promise.resolve(result);
  },
};
