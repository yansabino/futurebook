interface RefreshTokenGateway {
    createRefreshToken(input: RefreshToken): Promise<void>;
    getRefreshToken(
        device: string,
        userId: string
    ): Promise <RefreshToken | undefined>;
    deleteRefreshToken(device: string, id: string): Promise<void>
}

interface RefreshToken {
    token: string
    device: string
    userId: string
}