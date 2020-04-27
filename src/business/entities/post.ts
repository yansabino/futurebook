export class Post {
  constructor(
    private postId: string,
    private picture: string,
    private description: string,
    private creationDate: Date,
    private postType: PostType,
    private userId: string
  ) {}

  public getPostId(): string {
    return this.postId;
  }

  public getPicture(): string {
    return this.picture;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getPostType(): PostType {
    return this.postType;
  }

  public static mapStringsToPostType(postType: string): PostType {
    switch (postType) {
      case "NORMAL":
        return PostType.NORMAL;
      case "EVENT":
        return PostType.EVENT;
      default:
        throw new Error("Invalid Post Type");
    }
  }
}

export enum PostType {
  NORMAL = "NORMAL",
  EVENT = "EVENT"
}
