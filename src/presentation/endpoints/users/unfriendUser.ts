import { Request, Response } from "express";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { UserDB } from "../../../data/userDB";
import { UnfriendUserUC } from "../../../business/usecase/users/unfriendUser";

export const unfriendUserEndPoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication();

    const userDataBase = new UserDB();

    const userInfo = jwtAuth.verifyToken(req.headers.auth as string);

    const useCase = new UnfriendUserUC(userDataBase);

    const input = {
      userId: userInfo.userId,
      friendId: req.body.friendId
    };

    await useCase.execute(input);

    res.send({
      message: "Friend Deleted Sucessfully"
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
