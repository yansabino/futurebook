import { PostGateway } from "../../gateways/postGateway";

export class LikePostUC {
  constructor(private postGateway: PostGateway) {}

  async execute(input: LikePostUCInput) {
    await this.postGateway.likePost(input.userId, input.postId);
  }
}

export interface LikePostUCInput {
  userId: string;
  postId: string;
}
