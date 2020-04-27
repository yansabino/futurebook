import { PostGateway } from "../../gateways/postGateway";

export class DislikePostUC {
  constructor(private postGateway: PostGateway) {}

  async execute(input: DislikePostUCInput) {
    await this.postGateway.dislikePost(input.userId, input.postId);
  }
}

export interface DislikePostUCInput {
  userId: string;
  postId: string;
}
