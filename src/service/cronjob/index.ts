import chartService from "../chart";
import { songService } from "../song";

export const conjobService = {
  start: () => {
    chartService.uppdateChart();
    songService.randomViews();
  },
};
