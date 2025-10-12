import { getAccessToken } from "@privy-io/react-auth";

export const getAuthToken = async () => {
  const token = await getAccessToken();
  return token;
};

const prod = process.env.NEXT_PUBLIC_PRODUCTION == "true";

let baseUrl = prod
  ? process.env.NEXT_PUBLIC_BASE_PROD_API_URL
  : process.env.NEXT_PUBLIC_BASE_STAGE_API_URL;

if (!baseUrl) {
  baseUrl = process.env.NEXT_PUBLIC_BASE_STAGE_API_URL;
}

export { baseUrl };
