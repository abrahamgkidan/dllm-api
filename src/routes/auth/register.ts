import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import logger from "../../config/logger";

import { authService, tokenService } from "../../services";

/**
 * A route handler function to register sa User.
 */
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  logger.info("controller::registerUser");
  const user = await authService.register(req.body);
  const token = await tokenService.generateToken(user);
  res.status(httpStatus.CREATED).json({ user, token });
});
