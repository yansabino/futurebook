import { PostGateway } from "../../gateways/postGateway";
import { PostType, Post } from "../../entities/post";

import { v4 } from "uuid";

export class CreatePostUC {
  constructor(private postGateway: PostGateway) {}

  async execute(input: CreatePostUCInput) {
    const postId = this.generatePostId();

    const newPost = new Post(
      postId,
      input.picture,
      input.description,
      new Date(),
      Post.mapStringsToPostType(input.postType),
      input.userId
    );

    await this.postGateway.createPost(newPost);
  }

  private generatePostId() {
    return v4();
  }
}

export interface CreatePostUCInput {
  picture: string;
  description: string;
  postType: PostType;
  userId: string;
}
