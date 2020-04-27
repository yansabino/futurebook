import { FeedGateway } from "../../gateways/feedGateway";
import { PostType } from "../../entities/post";

export class GetFeedUC {
  constructor(private feedGateway: FeedGateway) {}

  private USERS_PER_PAGE = 3;

  public async execute(input: GetFeedUCInput): Promise<GetFeedUCOutput[]> {
    let page = input.page >= 1 ? input.page : 1;
    const offset = this.USERS_PER_PAGE * (page - 1);

    const posts = await this.feedGateway.getFeedForUser(
      input.userId,
      this.USERS_PER_PAGE,
      offset
    );

    return posts.map(post => {
      return {
        postId: post.getPostId(),
        picture: post.getPicture(),
        description: post.getDescription(),
        creationDate: post.getCreationDate(),
        postType: post.getPostType(),
        name: post.getName()
      };
    });
  }
}

export interface GetFeedUCInput {
  userId: string;
  page: number;
}

export interface GetFeedUCOutput {
  postId: string;
  picture: string;
  description: string;
  creationDate: Date;
  postType: PostType;
  name: string;
}
