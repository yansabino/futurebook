import { Post, PostType } from "./post";

export class PostFeed extends Post {
  constructor(
    postId: string,
    picture: string,
    description: string,
    creationDate: Date,
    postType: PostType,
    userId: string,
    private name: string
  ) {
    super(postId, picture, description, creationDate, postType, userId);
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
