import { getAccessToken } from "@privy-io/react-auth";

export const getAuthToken = async () => {
  const token = await getAccessToken();
  return token;
};
