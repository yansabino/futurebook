import { Request, Response } from "express";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { PostDB } from "../../../data/postDB";
import { DislikePostUC } from "../../../business/usecase/posts/dislikePost";

export const dislikePostEndPoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication();

    const postDataBase = new PostDB();

    const userInfo = jwtAuth.verifyToken(req.headers.auth as string);

    const useCase = new DislikePostUC(postDataBase);

    const input = {
      userId: userInfo.id,
      postId: req.body.postId
    };

    await useCase.execute(input);

    res.status(200).send({
      message: "Post Disliked Sucessfully"
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
