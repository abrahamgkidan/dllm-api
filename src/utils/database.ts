import mongoose from "mongoose";

import config from "../config/config";
import logger from "../config/logger";

export const connect = async () => {
  logger.info("database::connect");
  try {
    let connectionUrl = config.mongoose.url;
    logger.debug(`connection URL: ${connectionUrl}`);
    mongoose.connect(connectionUrl);
  } catch (err: any) {
    logger.error(`Unable to connect to database. Detail: ${err.message}`);
    throw err;
  }
};

module.exports = {
  connect,
};
