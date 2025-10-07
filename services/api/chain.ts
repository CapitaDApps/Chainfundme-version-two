import { ChainDocument } from "@/types/api";
import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/chain`;

async function getChains() {
  const accessToken = await getAuthToken();
  const resp = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return resp.data.data as ChainDocument[];
}

export { getChains };
