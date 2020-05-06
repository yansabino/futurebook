import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { UserGateway } from "../../gateways/userGateway";
import {
    ACCESS_TOKEN_EXPIRES_IN
} from "../../../utils/JWTAuthentication";

export class RefreshAccessTokenUC {
  constructor(
    private authenticationGateway: AuthenticationGateway,
    private userDb: UserGateway,
    private refreshTokenDb: RefreshTokenGateway
  ) {}

  public async execute(
    input: RefreshAccessTokenUCInput
  ): Promise<RefreshAccessTokenUCOutput> {
    const usersInfo = this.authenticationGateway.verifyToken(
      input.refreshToken
    );

    if (!usersInfo.userDevice) {
      throw new Error("Missing information in Refresh Token");
    }

    const user = await this.userDb.getUserById(usersInfo.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const refreshToken = await this.refreshTokenDb.getRefreshToken(
      usersInfo.userDevice,
      user.getId()
    );

    if (!refreshToken) {
      throw new Error("Refresh token is not valid");
    }

    const accessToken = this.authenticationGateway.generateToken(
        {
          userId: user.getId()
        },
        ACCESS_TOKEN_EXPIRES_IN
      );
      return {
        accessToken
      };
  }
}

interface RefreshAccessTokenUCInput {
  refreshToken: string;
}

interface RefreshAccessTokenUCOutput {
  accessToken: string;
}
