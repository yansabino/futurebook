import { Request, Response } from "express";
import { CreatePostUC } from "../../../business/usecase/posts/createPost";
import { PostDB } from "../../../data/postDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";

export const createPostEndpoint = async (req: Request, res: Response) => {
  try {
    const createPostUC = new CreatePostUC(new PostDB());
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);
    const input = {
      picture: req.body.picture,
      description: req.body.description,
      postType: req.body.postType,
      userId: userId.id
    };
    
    await createPostUC.execute(input);
    res.status(200).send({ message: "Post Created" });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
