import { Request, Response } from "express";
import { RefreshAccessTokenUC } from "../../../business/usecase/users/refreshAccessToken";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { RefreshTokenDB } from "../../../data/refreshTokenDB";
import { UserDB } from "../../../data/userDB";

export const refreshAccessTokenEndPoint = async (
  req: Request,
  res: Response
) => {
  try {
    const uc = new RefreshAccessTokenUC(
      new JWTAuthentication(),
      new UserDB(),
      new RefreshTokenDB()
    );

    const result = await uc.execute({
      refreshToken: req.headers.refresh as string,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(err.errorCode || 400).send({
      message: err.message,
    });
  }
};
