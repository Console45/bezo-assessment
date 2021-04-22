import { Container, Token } from "typedi";
import { Schema, model, HookNextFunction } from "mongoose";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import keys from "../constants/keys";
import { IUser, IUserModel } from "../@types";

const userSchema: Schema<IUser> = new Schema<IUser>({
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    minlength: 10,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
});

userSchema.methods.createAccessToken = function (
  this: IUser,
  expires: string | undefined = undefined
): string {
  const accessToken: string = sign(
    { userId: this._id.toString() },
    keys.JWT_ACCESS_TOKEN_SECRET,
    expires ? { expiresIn: expires } : undefined
  );
  return accessToken;
};

userSchema.pre<IUser>(
  "save",
  async function (next: HookNextFunction): Promise<void> {
    if (this.isModified("password"))
      this.password = await hash(this.password, 8);
    next();
  }
);

const User = model<IUser, IUserModel>("User", userSchema);

export const USER_MODEL_TOKEN = new Token<IUserModel>("user.model");
Container.set(USER_MODEL_TOKEN, User);

export default User;
