import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../../../utils/JWTAuthentication";

export class LogInUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway,
    private refreshTokenGateway: RefreshTokenGateway
  ) {}

  public async execute(input: LogInUCInput) {
    const user = await this.userGateway.logIn(input.email);

    if (!user) {
      throw new Error("Email Incorreto");
    }

    if (
      !(await this.cryptographyGateway.compare(
        input.password,
        user.getPassword()
      ))
    ) {
      throw new Error("Senha Incorreta");
    }

    const accessToken = this.authenticationGateway.generateToken(
      {
        userId: user.getId(),
      },
      ACCESS_TOKEN_EXPIRES_IN
    );

    const refreshToken = this.authenticationGateway.generateToken(
      {
        userId: user.getId(),
        userDevice: input.device,
      },
      REFRESH_TOKEN_EXPIRES_IN
    );

    const refreshTokenForUserAndDevice = await this.refreshTokenGateway.getRefreshToken(
      input.device,
      user.getId()
    );

    if (refreshTokenForUserAndDevice) {
      await this.refreshTokenGateway.deleteRefreshToken(
        input.device,
        user.getId()
      );
    }

    await this.refreshTokenGateway.createRefreshToken({
      token: refreshToken,
      userId: user.getId(),
      device: input.device,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export interface LogInUCInput {
  email: string;
  password: string;
  device: string;
}