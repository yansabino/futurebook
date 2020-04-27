import { UserGateway } from "../../gateways/userGateway";
import { v4 } from "uuid";
import { User } from "../../entities/user";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class SignUpUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) {}

  public async execute(input: SignUpUCInput): Promise<SignUpUCOutput> {
    const id = v4();
    const password = await this.cryptographyGateway.encrypt(input.password);
    const user = new User(id, input.name, input.email, password);

    await this.userGateway.signUp(user);

    const token = this.authenticationGateway.generateToken({
      id: user.getId()
    });

    return {
      message: "User signed up sucessfully!",
      token
    };
  }
}

export interface SignUpUCInput {
  name: string;
  email: string;
  password: string;
}

export interface SignUpUCOutput {
  message: string;
  token: string;
}
