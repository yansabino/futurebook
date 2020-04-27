import { Request, Response } from "express";
import { LogInUC } from "../../../business/usecase/users/logIn";
import { UserDB } from "../../../data/userDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";

export const loginEndPoint = async (req: Request, res: Response) => {
  try {
    const loginUC = new LogInUC(
      new UserDB(),
      new JWTAuthentication(),
      new BcryptService()
    );
    const result = await loginUC.execute({
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).send({ message: "User Logged In Successfully", result });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
