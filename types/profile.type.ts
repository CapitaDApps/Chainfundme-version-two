export type Profile = {
  displayName?: string;
  bio?: string;
  email?: string;
  xLink?: string;
  lnLink?: string;
  walletAddress?: string;
  avatar?: string | File;
  coverAvatar?: string | File;
};

export const mockProfile: Profile = {
  displayName: "Sam Example",
  bio: "A sample bio used for local development. This bio should be long enough to satisfy validations.",
  email: "sam@example.com",
  xLink: "https://x.com/sam",
  lnLink: "https://linkedin.com/in/sam",
  walletAddress: "0x0000000000000000000000000000000000000000",
  avatar: "/avatar.png",
  coverAvatar: "/cover.png",
};
