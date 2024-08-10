import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";

import config from "../config/config";
import logger from "../config/logger";

export const errorConverter = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let error = err;
    
      const statusCode =
        error.statusCode || error instanceof mongoose.Error
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new Error(message);
      error.statusCode = statusCode;
      error.stack = err.stack;
    
    next(error);
  };
  
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.env === "production") {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
