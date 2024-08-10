import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import logger from "../../config/logger";
import { chatService } from "../../services";
import { IUser } from "src/models/user.model";
import httpStatus from "http-status";

/**
 * A route handler function to list all chats.
 */
export const removeAllChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("controller::removeAllChat");
  const userId = (req.user as IUser)?.id;
  await chatService.deleteAllChats();
  res.status(httpStatus.NO_CONTENT).send({ message: "All chats removed" });
});
