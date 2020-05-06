import { User } from "../entities/user";

export interface UserGateway {
  signUp(user: User): Promise<void>;
  logIn(email: string): Promise<User | undefined>;
  createFriendRelation(userId: string, friendId: string): Promise<void>;
  deleteFriendRelation(userId: string, friendId: string): Promise<void>;
  getUserById(userId: string): Promise<User | undefined>;
}
