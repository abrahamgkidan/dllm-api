import Chat, { IChat } from "../models/chat.model";
import logger from "../config/logger";
import Message from "../models/message.model";

/**
 * Chat service class
 */
export class ChatService {
  /**
   * Create a new chat
   * @param {IChat} chat - The chat object
   * @returns {Promise<IChat>} - The created chat object
   */
  async createChat(chat: IChat): Promise<IChat> {
    logger.debug("ChatService::createChat");
    const newChat = await Chat.create(chat);
    logger.debug(`newChat: ${JSON.stringify(newChat)}`);
    return newChat;
  }

  /**
   * Get a chat by id
   * @param {string} id - The chat id
   * @returns {Promise<IChat | null>} - The chat object or null
   */
  async getChatById(id: string): Promise<IChat | null> {
    logger.debug("ChatService::getChatById");
    return Chat.findById(id).populate("messages");
  }

  async updateChat(id: string, chat: Partial<IChat>): Promise<IChat | null> {
    logger.debug("ChatService::updateChat");
    await Chat.updateOne({ id }, { $set: chat });
    return Chat.findById(id);
  }
  /**
   * List all chats for a user
   * @param {string} userId - The user id
   * @returns {Promise<IChat[]>} - An array of chat objects
   */
  async listChat(userId: string): Promise<IChat[]> {
    logger.debug("ChatService::listChat");
    const chats = await Chat.find({ user: userId }).populate("messages");
    logger.debug(`chats: ${JSON.stringify(chats)}`);
    return chats;
  }

  /**
   * Add a message to a chat
   * @param {string} chatId - The chat id
   * @param {any} message - The message object
   * @returns {Promise<IChat | null>} - The chat object or null
   */
  async addMessage(chatId: string, message: any): Promise<any> {
    logger.debug("ChatService::addMessage");
    message = await Message.create({ ...message, chat: chatId });
    const chat = await Chat.findById(chatId);
    chat?.messages?.push(message);
    await chat?.save();
    // return chat;
  }

  /**
   * Delete all chats
   */
  async deleteAllChats(): Promise<void> {
    logger.debug("ChatService::deleteAllChats");
    await Chat.deleteMany({});
  }
}
