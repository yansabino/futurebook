import { Request, Response } from "express";
import { LogInUC } from "../../../business/usecase/users/logIn";
import { UserDB } from "../../../data/userDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";
import { RefreshTokenDB } from "../../../data/refreshTokenDB";

export const loginEndPoint = async (req: Request, res: Response) => {
  try {
    const loginUC = new LogInUC(
      new UserDB(),
      new JWTAuthentication(),
      new BcryptService(),
      new RefreshTokenDB()
    );
    const token = await loginUC.execute({
      email: req.body.email,
      password: req.body.password,
      device: req.body.device
    });

    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
