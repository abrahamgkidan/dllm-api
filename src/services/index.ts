import { AuthService } from "./auth.service";
import { ChatService } from "./chat.service";
import { LlmApiService } from "./llm-api.service";
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

export const authService = new AuthService();
export const chatService = new ChatService();
export const llmApiService = new LlmApiService();
export const userService = new UserService();
export const tokenService = new TokenService();
