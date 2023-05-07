import { config } from "dotenv";
import * as path from "path";

config({ path: `.env.${process.env.NODE_ENV}` });

const env = process.env.NODE_ENV;
const configEnv = require(`./${env}`);
export default {
  root: path.join(__dirname, "/.."),
  ...configEnv.default,
};
