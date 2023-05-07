import mongoose, { Types } from "mongoose";
export interface IChartService {
  uppdateChart: () => Promise<any>;
  get: (option: number) => Promise<any>;
}
