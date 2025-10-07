import { TokenDocument } from "@/types/api";
import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/token`;

async function getTokens() {
  const accessToken = await getAuthToken();

  const resp = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data.data as TokenDocument[];
}

export { getTokens };
