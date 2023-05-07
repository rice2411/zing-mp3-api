import mongoose from "mongoose";
import { IStatisticService } from "./interface";
import { Album, Song, Transaction, User } from "../../../models";

const StatisticService: IStatisticService = {
  getStatistic: async () => {
    const countOfUsers = await User.countDocuments();
    const countOfSongs = await Song.countDocuments();
    const countOfAlbum = await Album.countDocuments();
    const transaction = await Transaction.find({});
    const arrayValue = await Promise.all(
      transaction.map((item) => {
        return item.value;
      })
    );
    return Promise.resolve({
      users: countOfUsers,
      songs: countOfSongs,
      albums: countOfAlbum,
      total: arrayValue.reduce((partialSum: any, a) => partialSum + a, 0),
    });
  },
};

export { StatisticService };
