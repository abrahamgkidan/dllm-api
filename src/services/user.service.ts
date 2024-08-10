import logger from "../config/logger";
import User, { IUser } from "../models/user.model";

/**
 * User service class
 */
export class UserService {
  /**
   * Create a new user
   * @param {IUser} user - The user object
   * @returns {Promise<IUser>} - The created user object
   */
  async createUser(user: IUser): Promise<IUser> {
    logger.debug("UserService::createUser");
    return User.create(user);
  }

  /**
   * Get a user by email
   * @param {string} email - The user email
   * @returns {Promise<IUser | null>} - The user object or null
   */
  async getUserById(id: string): Promise<IUser | null> {
    logger.debug("UserService::getUserById");
    return User.findById(id);
  }
}
