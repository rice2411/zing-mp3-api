import mongoose from "mongoose";
import Promise from "bluebird";
import env from "../env";
const DB_URL = env.db;
Promise.promisifyAll(mongoose);
mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    const dbStatus = `*    DB Connection: OK\n****************************\n`;
    console.log("****************************");
    console.log("*    Starting Server");
    console.log(`*    DB_URL: ${DB_URL}`);
    console.log(`*    Port: ${env.port || 2411}`);
    console.log(`*    NODE_ENV: ${env.env}`);
    console.log(`*    Database: MongoDB`);
    console.log(dbStatus);
  })
  .catch((err) => {
    const dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
    console.log(dbStatus);
  });
