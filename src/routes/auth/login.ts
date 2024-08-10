import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import logger from "../../config/logger";

import { authService, tokenService } from "../../services";

/**
 * A route handler function to authenticate a User.
 */
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  logger.info('controller::loginUser'); 
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const token = await tokenService.generateToken(user);
  res.send({ user, token });
});
