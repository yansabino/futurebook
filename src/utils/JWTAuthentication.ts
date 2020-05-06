import * as jwt from "jsonwebtoken";
import {
  AuthenticationGateway,
  UsersInfoForToken,
} from "../business/gateways/authenticationGateway";
import * as dotenv from "dotenv";
dotenv.config();

export class JWTAuthentication implements AuthenticationGateway {
  private SECRET_KEY = process.env.SECRET_KEY as string;

  public generateToken(input: UsersInfoForToken, expiresIn: string): string {
    const token = jwt.sign(
      {
        userId: input.userId,
        userDevice: input.userDevice,
      },
      this.SECRET_KEY,
      {
        expiresIn,
      }
    );

    return token;
  }

  public verifyToken(token: string): UsersInfoForToken {
    const data = jwt.verify(token, this.SECRET_KEY) as UsersInfoForToken;

    return { 
      userId: data.userId,
      userDevice: data.userDevice 
    };
  }
}

export const ACCESS_TOKEN_EXPIRES_IN = "30s";
export const REFRESH_TOKEN_EXPIRES_IN = "24h";
