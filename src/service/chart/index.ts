import { IChartService } from "./interface";
import cron from "cron";
import { Chart, Song } from "../../models";
import mongoose from "mongoose";
import { Artist } from "../../models/artist";
import SongResponseDTO from "../../dtos/response/song/SongResponseDTO";
import { setStringDate, timeUpdateChart } from "../../utils/utils";
import { isGreaterThanToday } from "../../utils/utils";

const chartService: IChartService = {
  get: async (option: number) => {
    const chart: any = await Chart.findOne().limit(1).sort({ createdAt: -1 });
    chart.data = chart.data.slice(0, option);
    return Promise.resolve(chart);
  },
  uppdateChart: async () => {
    const job = new cron.CronJob({
      cronTime: "*/5 * * * * *", // Chạy Jobs vào 23h30 hằng đêm
      onTick: async function () {
        const today = new Date();
        const hours = today.getHours();
        const time = timeUpdateChart(hours);
        const chart: any = await Chart.findOne()
          .limit(1)
          .sort({ createdAt: -1 });
        const lastestChartTime = chart ? new Date(chart.createdAt) : null;

        if (
          (time.value == 19 && lastestChartTime == null) ||
          (time.value == 19 && isGreaterThanToday(lastestChartTime))
        ) {
          const songs = await Song.find({});
          const result = await Promise.all(
            songs.map(async (item: any) => {
              const totalViews = item.views.reduce(
                (accumulator, curr) => accumulator + curr
              );
              const artist = await Artist.findOne({
                _id: new mongoose.Types.ObjectId(item.artistId),
              });
              const songWithArtist = new SongResponseDTO().responseSimpleDTO(
                item,
                artist
              );

              return {
                _id: item._id,
                viewsPerDay: totalViews,
                info: songWithArtist,
                viewsData: item.views,
              };
            })
          );
          result.sort((a: any, b: any) => {
            return b.viewsPerDay - a.viewsPerDay || b.name - a.name;
          });

          const newData = {
            day: setStringDate(today),
            data: [...result],
          };
          await Chart.insertMany(newData);
        }
      },
      start: true,
      timeZone: "Asia/Ho_Chi_Minh", // Lưu ý set lại time zone cho đúng
    });
    job.start();

    return Promise.resolve(null);
  },
};

export default chartService;
