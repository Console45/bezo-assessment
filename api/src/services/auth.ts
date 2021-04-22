import { Container, Service, Inject } from "typedi";
import { USER_MODEL_TOKEN } from "../models/User";
import { IUser, IUserModel, UserDetails } from "../@types";
import { ApiError, authLogger } from "../utils";

@Service()
class AuthServices {
  private readonly _userModel: IUserModel;
  constructor(@Inject(USER_MODEL_TOKEN) userModel: IUserModel) {
    this._userModel = userModel;
  }

  /**
   * Registers a new user
   * @param userDetails user details
   * @returns user
   */
  public async registerUser(userDetails: UserDetails): Promise<string> {
    const existingUser: IUser | null = await this._userModel.findOne({
      phoneNumber: userDetails.phoneNumber,
    });
    if (existingUser) {
      const errorMessage = `Phone number already exists`;
      authLogger.error(
        `message:${errorMessage},phoneNumber: ${userDetails.phoneNumber},`
      );
      throw new ApiError(409, errorMessage);
    }
    const user: IUser = new this._userModel(userDetails);
    await user.save();
    authLogger.info(
      `message:Registration is successful,phoneNumber:${user.phoneNumber}`
    );
    return user.createAccessToken();
  }
}

export const authServiceInstance = Container.get(AuthServices);
