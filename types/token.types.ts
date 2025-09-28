export type TokenType = "usdc" | "eth" | "frenchie" | "enb" | "cngn" | "bhusky";

export type Token = {
  [C in TokenType]: string;
};

export interface IToken {
  name: TokenType;
  balance: string;
  src: string;
}
