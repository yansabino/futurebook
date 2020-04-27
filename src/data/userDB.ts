import { BaseDB } from "./baseDB";
import { UserGateway } from "../business/gateways/userGateway";
import { User } from "../business/entities/user";
import { DuplicateUserError } from "../business/error/duplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "users";
  private friendTableName = "friend_user";

  public async signUp(user: User) {
    try {
      await this.connection
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword()
        })
        .into(this.userTableName);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new DuplicateUserError();
      } else {
        throw err;
      }
    }
  }

  public async logIn(email: string): Promise<User | undefined> {
    const user = await this.connection
      .select("*")
      .from(this.userTableName)
      .where({ email });

    if (!user[0]) {
      return undefined;
    }

    return new User(user[0].id, user[0].name, user[0].email, user[0].password);
  }

  public async createFriendRelation(
    userId: string,
    friendId: string
  ): Promise<void> {
    await this.connection.raw(
      `INSERT INTO ${this.friendTableName}
      (\`user_id\`, \`friend_id\`) 
      VALUES ('${userId}','${friendId}');`
    );
  }

  public async deleteFriendRelation(
    userId: string,
    friendId: string
  ): Promise<void> {
    await this.connection.raw(`
      DELETE FROM ${this.friendTableName}
      WHERE user_id = '${userId}' AND friend_id = '${friendId}';
    `);
  }
}
