import { Post } from "../entities/post";

export interface PostGateway {
  createPost(post: Post): Promise<void>;
  likePost(userId: string, postId: string): Promise<void>;
  dislikePost(userId: string, postId: string): Promise<void>;
  commentPost(
    commentId: string,
    postId: string,
    userId: string,
    comment: string
  ): Promise<void>;
}
