import { BaseDB } from "./baseDB";

export class RefreshTokenDB extends BaseDB implements RefreshTokenGateway {
  private refreshTokenTableName = "REFRESH_TOKEN";

  public async createRefreshToken(input: RefreshToken): Promise<void> {
    await this.connection.raw(`
        INSERT INTO ${this.refreshTokenTableName} (token, device, userId)
        VALUES(
            '${input.token}',
            '${input.device}', 
            '${input.userId}'
        )    
        `);
  }

  public async getRefreshToken(
    device: string,
    userId: string
  ): Promise<RefreshToken | undefined> {
    const result = await this.connection.raw(`
        SELECT * FROM ${this.refreshTokenTableName} 
        WHERE device = '${device}' AND userId = '${userId}'
        `);

    return (
      result[0][0] && {
        token: result[0][0].token,
        device: result[0][0].device,
        userId: result[0][0].userId,
      }
    );
  }

  public async deleteRefreshToken(
    device: string,
    userId: string
  ): Promise<void> {
    await this.connection.raw(`
        DELETE FROM ${this.refreshTokenTableName} 
        WHERE device = '${device}' AND userId = '${userId}'
        `);
  }
}
