import { config } from "dotenv";
import * as path from "path";

config();

const env = process.env.NODE_ENV || "development";
const configEnv = require(`./${env}`);

export default {
  root: path.join(__dirname, "/.."),
  ...configEnv.default,
};
