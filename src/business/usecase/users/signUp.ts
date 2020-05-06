import { UserGateway } from "../../gateways/userGateway";
import { v4 } from "uuid";
import { User } from "../../entities/user";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../../../utils/JWTAuthentication";

export class SignUpUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway,
    private refreshTokenGateway: RefreshTokenGateway
  ) {}

  public async execute(input: SignUpUCInput): Promise<SignUpUCOutput> {
    const id = v4();
    const password = await this.cryptographyGateway.encrypt(input.password);
    const user = new User(id, input.name, input.email, password);

    await this.userGateway.signUp(user);

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

    await this.refreshTokenGateway.createRefreshToken({
      token: refreshToken,
      userId: user.getId(),
      device: input.device
    })

    return {
      accessToken,
      refreshToken
    };
  }
}

export interface SignUpUCInput {
  name: string;
  email: string;
  password: string;
  device: string;
}

export interface SignUpUCOutput {
  accessToken: string;
  refreshToken: string;
}
