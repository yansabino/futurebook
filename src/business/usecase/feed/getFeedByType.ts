import { FeedGateway } from "../../gateways/feedGateway";
import { PostType } from "../../entities/post";

export class GetFeedByTypeUC {
  constructor(private feedGateway: FeedGateway) {}

  private USERS_PER_PAGE = 3;

  public async execute(
    input: GetFeedByTypeUCInput
  ): Promise<GetFeedByTypeUCOutput[]> {
    let page = input.page >= 1 ? input.page : 1;
    const offset = this.USERS_PER_PAGE * (page - 1);

    const posts = await this.feedGateway.getFeedByType(
      input.userId,
      input.postType,
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

export interface GetFeedByTypeUCInput {
  userId: string;
  postType: PostType;
  page: number;
}

export interface GetFeedByTypeUCOutput {
  postId: string;
  picture: string;
  description: string;
  creationDate: Date;
  postType: PostType;
  name: string;
}
