import * as jwt from "jsonwebtoken";
import {
  AuthenticationGateway,
  UsersInfoForToken
} from "../business/gateways/authenticationGateway";

export class JWTAuthentication implements AuthenticationGateway {
  private SECRET_KEY = "bananinha";
  private expiresIn = "10h";

  public generateToken(input: UsersInfoForToken): string {
    const token = jwt.sign({ id: input.id }, this.SECRET_KEY, {
      expiresIn: this.expiresIn
    });

    return token;
  }

  public verifyToken(token: string): UsersInfoForToken {
    const data = jwt.verify(token, this.SECRET_KEY) as UsersInfoForToken;

    return { id: data.id };
  }
}
