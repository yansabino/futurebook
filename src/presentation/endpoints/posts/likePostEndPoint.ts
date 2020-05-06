import { Request, Response } from "express";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { PostDB } from "../../../data/postDB";
import { LikePostUC } from "../../../business/usecase/posts/likePost";

export const likePostEndPoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication();

    const postDB = new PostDB();

    const userInfo = jwtAuth.verifyToken(req.headers.auth as string);

    const useCase = new LikePostUC(postDB);

    const input = {
      userId: userInfo.userId,
      postId: req.body.postId
    };

    await useCase.execute(input);

    res.status(200).send({
      message: "Post Liked Sucessfully"
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
