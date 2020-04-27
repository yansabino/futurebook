export interface AuthenticationGateway {
  generateToken(input: UsersInfoForToken): string;
  verifyToken(token: string): UsersInfoForToken;
}

export interface UsersInfoForToken {
  id: string;
}
