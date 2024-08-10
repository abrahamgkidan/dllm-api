import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import logger from "../../config/logger";
import { chatService } from "../../services";
import { IUser } from "src/models/user.model";
import httpStatus from "http-status";

/**
 * A route handler function to list all chats.
 */
export const listChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("controller::listChat");
  const userId = (req.user as IUser)?.id;
  const chats = await chatService.listChat(userId as any);
  res.json({ chats });
});
