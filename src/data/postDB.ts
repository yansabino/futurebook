import { BaseDB } from "./baseDB";
import { PostGateway } from "../business/gateways/postGateway";
import { Post } from "../business/entities/post";

export class PostDB extends BaseDB implements PostGateway {
  private postTableName = "posts";
  private likeTableName = "likes";
  private commentTableName = "comments";

  public async createPost(post: Post): Promise<void> {
    try {
      await this.connection
        .insert({
          postId: post.getPostId(),
          picture: post.getPicture(),
          description: post.getDescription(),
          creationDate: post.getCreationDate(),
          postType: post.getPostType(),
          userId: post.getUserId()
        })
        .into(this.postTableName);
    } catch (err) {
      throw err;
    }
  }

  public async likePost(userId: string, postId: string): Promise<void> {
    await this.connection.raw(`
            INSERT INTO ${this.likeTableName}
            (\`user_id\`, \`post_id\`)
            VALUES ('${userId}', '${postId}')
        `);
  }

  public async dislikePost(userId: string, postId: string): Promise<void> {
    await this.connection.raw(`
            DELETE FROM ${this.likeTableName}
            WHERE user_id = '${userId}' AND post_id = '${postId}';
        `);
  }

  public async commentPost(
    commentId: string,
    postId: string,
    userId: string,
    comment: string
  ): Promise<void> {
    const result = await this.connection.raw(`
        INSERT INTO ${this.commentTableName}
            (\`commentId\`, \`postId\`, \`userId\`, \`comment\`)
            VALUES ('${commentId}', '${postId}', '${userId}', '${comment}');
        `);
  }
}
