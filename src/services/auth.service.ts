import User, { IUser } from "../models/user.model";
import logger from "../config/logger";

/**
 * Auth service class
 */
export class AuthService {
  /**
   * Register a new user
   * @param {IUser} user - The user object
   * @returns {Promise<IUser>} - The created user object
   */
  async register(user: IUser): Promise<IUser> {
    logger.debug("AuthService::register");
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    return User.create(user);
  }

  /**
   * Login a user
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {Promise<IUser>} - The user object
   */
  async login(email: string, password: string): Promise<IUser> {
    logger.debug("AuthService::login");
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.isPasswordMatch(password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    return user;
  }
}
