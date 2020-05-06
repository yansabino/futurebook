import { Request, Response } from "express";
import { SignUpUC } from "../../../business/usecase/users/signUp";
import { UserDB } from "../../../data/userDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { BcryptService } from "../../../utils/bcryptService";
import { RefreshTokenDB } from "../../../data/refreshTokenDB";

export const signUpEndPoint = async (req: Request, res: Response) => {
  try {
    const signUpUC = new SignUpUC(
      new UserDB(),
      new JWTAuthentication(),
      new BcryptService(),
      new RefreshTokenDB()
    );

    const result = await signUpUC.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      device: req.body.device,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
