import mongoose from "mongoose";
import QueryOptions from "../../dtos/QueryOptions";

import { Album, Song } from "../../models";

import { ISongService } from "./interface";
import { SongErrorMessage } from "../../messages/error/song/index";
import { BaseErrorMessage } from "../../messages/error/base/index";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { hi } from "date-fns/locale";
import { Artist } from "../../models/artist";
import cron from "cron";
import { timeUpdateChart } from "../../utils/utils";
import { ApiPaginateResult } from "../../helpers";

const songService: ISongService = {
  getLyrics: async (songId: string) => {
    const song = await Song.findOne({
      _id: new mongoose.Types.ObjectId(songId),
    });
    return Promise.resolve(song);
  },
  increaseViews: async (songId: string) => {
    const song = await Song.findOne({
      _id: new mongoose.Types.ObjectId(songId),
    });
    const today = new Date();
    const hours = today.getHours();
    const time = timeUpdateChart(hours);
    // const viewsData = song.views;
    // viewsData[time.index] = Number(viewsData[time.index]) + 1;
    // song.views = viewsData;
    const viewsData = [...song.views];
    viewsData[time.index] = Number(viewsData[time.index]) + 1;
    song.views = viewsData;
    song.totalViews = Number(song.totalViews) + 1;
    await song.saveAsync();

    return Promise.resolve(song);
  },
  randomViews: async () => {
    const job = new cron.CronJob({
      cronTime: "0 0 * * *", // Chạy Jobs vào 23h30 hằng đêm
      onTick: async function () {
        const songs = await Song.find({});
        //  Math.floor(Math.random() * 10000 - 1000 + 1) + 1000,
        songs.map((song) => {
          const viewData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          // const totalViews = viewData.reduce(
          //   (accumulator, curr) => accumulator + curr
          // );
          song.views = viewData;
          // song.totalViews = totalViews;
          // song.totalViews = Math.floor(Math.random() * 10000 - 1000 + 1) + 1000;
          song.saveAsync();
        });
      },
      start: true,
      timeZone: "Asia/Ho_Chi_Minh", // Lưu ý set lại time zone cho đúng
    });
    job.start();
  },
  getNewRelease: async (option: number = 12) => {
    const songs = await Song.find({})
      .sort({ createdAt: -1 })
      .limit(Number(option));
    const result = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findOne({ _id: song.artistId });
        const newSong = new SongResponseDTO().responseSimpleDTO(song, artist);
        return newSong;
      })
    );

    return Promise.resolve(result);
  },

  get: async (id) => {
    try {
      const query = { _id: new mongoose.Types.ObjectId(id) };

      const song = await Song.findOne(query);

      if (!song)
        return Promise.reject(new Error(SongErrorMessage.SONG_NOT_FOUND));

      const songs = await Song.find({
        albumIds: song.originAlbumId,
        _id: { $ne: song._id },
      });
      // song.views = +song.views + 1;
      song.originAlbumId = new mongoose.Types.ObjectId(song.originAlbumId);

      song.save();
      const response = {
        song: new SongResponseDTO().responseDTO(song),
        songs: songs.map((song) => new SongResponseDTO().responseDTO(song)),
      };

      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  getAll: async (searchParams, options) => {
    // const transactions = await Transaction.find({});
    // const result = await Promise.all(
    //   transactions.map(async (transaction) => {
    //     const user = await User.findOne({
    //       _id: new mongoose.Types.ObjectId(transaction.userId),
    //     });
    //     const newTrans = { transaction: transaction, user: user };
    //     return newTrans;
    //   })
    // );

    const query = searchParams;
    const searchQuery = options.search
      ? { $text: { $search: `\"${options.search}\"` } }
      : {};
    const sortQuery = { createdAt: -1 };
    const aggregates = Song.aggregate()
      .match({
        ...query,
        ...searchQuery,
      })
      .sort(sortQuery);
    const songs: any = await Song.aggregatePaginateCustom(aggregates, {
      page: options.page,
      limit: options.limit,
    });
    songs.docs = await Promise.all(
      songs?.docs.map(async (song) => {
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
    const paginateResult = new ApiPaginateResult(songs).toRESPONSE();

    return Promise.resolve(paginateResult);
  },
};

export { songService };
