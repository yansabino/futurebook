import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class LogInUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
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

    const token = this.authenticationGateway.generateToken({
      id: user.getId()
    });

    return token;
  }
}

export interface LogInUCInput {
  email: string;
  password: string;
}
