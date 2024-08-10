import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import logger from "../../config/logger";

import { chatService, llmApiService } from "../../services";
import { IUser } from "../../models/user.model";

/**
 * A route handler function to query a chat.
 */
export const queryChat = catchAsync(async (req: Request, res: Response) => {
  logger.info("controller::queryChat");
  let chatData;
  if (req.body.id) {
    chatData = await chatService.getChatById(req.body.id);
  }
  if (!chatData) {
    const userId = (req.user as IUser)?.id;
    const newChat = { title: req.body.query, user: userId as any };
    chatData = await chatService.createChat(newChat);
  }

  const userMessage = { role: "user", content: req.body.query };
  const messages = [...(chatData?.messages || []), userMessage];
  const llmResponse = await llmApiService.queryModel({
    model: req.body.model ?? "mistral",
    messages,
  });
  const responseMessage = llmResponse.data;
  logger.debug(`llmResponse: ${responseMessage}`);

  const assistantMessage = { role: "assistant", content: responseMessage };
  await chatService.addMessage(chatData?.id as string, userMessage);
  await chatService.addMessage(chatData?.id as string, assistantMessage);

  const updatedChatData = await chatService.getChatById(chatData.id as any);

  res.send(updatedChatData);
});
