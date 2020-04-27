import { Post, PostType } from "../entities/post";
import { PostFeed } from "../entities/postFeed";

export interface FeedGateway {
  getFeedForUser(
    userId: string,
    limit: number,
    offset: number
  ): Promise<PostFeed[]>;
  getFeedByType(
    userId: string,
    postType: PostType,
    limit: number,
    offset: number
  ): Promise<PostFeed[]>;
}
