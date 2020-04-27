import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { GetFeedByTypeUC } from "../../../business/usecase/feed/getFeedByType";
import { PostType } from "../../../business/entities/post";

export const getFeedByTypeEndPoint = async (req: Request, res: Response) => {
  try {
    const feedDB = new FeedDB();
    const getFeedUC = new GetFeedByTypeUC(feedDB);
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);
    let postType;

    if (req.params.postType === "NORMAL") {
      postType = PostType.NORMAL;
    } else if (req.params.postType === "EVENT") {
      postType = PostType.EVENT;
    } else {
      throw new Error("invalid type");
    }

    const input = {
      userId: userId.id,
      postType,
      page: req.body.page
    };

    const result = await getFeedUC.execute(input);
    res.status(200).send({ result });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
