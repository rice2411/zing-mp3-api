import * as httpStatus from "http-status";
import cors from "cors";
import app from "./config/app";
import env from "./config/env";
import Debug = require("debug");

const debug = Debug("api:index");
const errorHandler = (err, req, res, next) => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    response_code: err.responseCode,
    message: err.message,
    success: false,
  });
  next();
};

const notFoundHandler = (req, res, next) => {
  const errorMessage = `Invalid api call path: ${req.path}`;
  const err: any = new Error(errorMessage);
  err.response_code = 3;
  err.status = httpStatus.NOT_FOUND;

  next(err);
};
app.use(cors());
// listen on port config.port
app.listen(process.env.PORT || env.port || 3000, () => {
  debug(`server started on port ${env.port} (${env.env})`);
});

app.use(notFoundHandler);
app.use(errorHandler);

require("./config/connection/mongodb");

module.exports = app;
export default app;
