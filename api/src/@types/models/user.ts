import { Document, Model } from "mongoose";

/**
 * Interface for the User Model
 * @interface IUser
 * @extends Document Mongoose Document Class
 */
export interface IUser extends Document {
  phoneNumber: string;
  password: string;
  /**
   * Creates a new access token
   * @returns {string} access token
   */
  createAccessToken: (expires?: string | undefined) => string;
  /**
   * Create a new refresh token
   * @returns {string} refresh token
   */
}

export interface IUserModel extends Model<IUser> {}
