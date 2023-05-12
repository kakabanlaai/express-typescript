export default interface TokenData {
  access: {token: string; expiresIn: number};
  refresh: {
    token: string;
    expiresIn: number;
  };
}
