import winston, { createLogger, format, transports } from "winston";
import config from "./config";
import { log } from "console";

// logging format configuration
const formats = [
  format.colorize(),
  format.timestamp(),
  format.splat(),
  format.printf(
    ({ timestamp, level, message }: any) => `${timestamp} [${level}] ${message}`
  ),
];

// console transport
const console = new transports.Console();

/**
 * Winston Logger Options
 */
const options = {
  level: config.logging.level,
  transports: [console],
  format: format.combine(...formats),
  exitOnError: false,
};

/**
 * Create Logger with base configuration
 */
const logger = createLogger(options);

export default logger;
