import { PostGateway } from "../../gateways/postGateway";
import { v4 } from "uuid";

export class CommentPostUC {
  constructor(private postGateway: PostGateway) {}
  async execute(input: CommentPostUCInput) {
    const commentId = v4();
    await this.postGateway.commentPost(
      commentId,
      input.postId,
      input.userId,
      input.comment
    );
  }
}

export interface CommentPostUCInput {
  postId: string;
  userId: string;
  comment: string;
}
