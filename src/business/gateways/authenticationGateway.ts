export interface AuthenticationGateway {
  generateToken(input: UsersInfoForToken, expiresIn: string): string;
  verifyToken(token: string): UsersInfoForToken;
}

export interface UsersInfoForToken {
  userId: string;
  userDevice?: string;
}
