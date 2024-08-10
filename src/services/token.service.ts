import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

export interface IDecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Token service class
 */
export class TokenService {
  /**
   * Generate token
   * @param {IUser} user - The user object
   * @returns {Promise<string>} - The generated token
   */
  async generateToken(user: IUser): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }

  /**
   * Verify token
   * @param {string} token - The token to verify
   * @returns {Promise<IDecodedToken>} - The decoded token
   */
  async verifyToken(token: string): Promise<IDecodedToken> {
    return jwt.verify(token, process.env.JWT_SECRET as string) as IDecodedToken;
  }
}
