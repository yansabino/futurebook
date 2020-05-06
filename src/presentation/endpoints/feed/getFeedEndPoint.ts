import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDB";
import { JWTAuthentication } from "../../../utils/JWTAuthentication";
import { GetFeedUC } from "../../../business/usecase/feed/getFeed";

export const getFeedEndPoint = async (req: Request, res: Response) => {
  try {
    const feedDB = new FeedDB();
    const getFeedUC = new GetFeedUC(feedDB);
    const jwtAuth = new JWTAuthentication();
    const userId = jwtAuth.verifyToken(req.headers.auth as string);

    const input = {
      userId: userId.userId,
      page: req.query.page
    };

    const result = await getFeedUC.execute(input);
    res.status(200).send({ result });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};
