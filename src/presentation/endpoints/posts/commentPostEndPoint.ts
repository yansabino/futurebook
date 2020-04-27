import { Request, Response } from "express";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { PostDB } from "../../../data/postDB";
import { LikePostUC } from "../../../business/usecase/posts/likePost";
import { CommentPostUC } from "../../../business/usecase/posts/commentPost";

export const commentPostEndPoint = async (req: Request, res: Response) => {
  try {
    const jwtAuth = new JWTAuthentication();

    const postDB = new PostDB();

    const userInfo = jwtAuth.verifyToken(req.headers.auth as string);

    const useCase = new CommentPostUC(postDB);

    const input = {
      postId: req.body.postId,
      userId: userInfo.id,
      comment: req.body.comment
    };

    await useCase.execute(input);

    res.status(200).send({
      message: "Commented Sucessfully"
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
