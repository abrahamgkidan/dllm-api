import { Server } from "http";
import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import { connect as dbConnect } from "./utils/database";
// import prisma from "./lib/prisma";

logger.debug(`starting API with configuration::${JSON.stringify(config)}`);
let server: Server;
dbConnect().then(async () => {
  server = app.listen(config.port, () => {
    logger.debug(`API ready for requests on port: ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(async () => {
      logger.debug("API component stopped");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.warn("SIGTERM received");
  if (server) {
    server.close();
  }
});
