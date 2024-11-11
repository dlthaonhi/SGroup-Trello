interface Login {
  email: string;
  password: string;
}
interface Token {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  tokenType: string;
}

export type { Login, Token };
