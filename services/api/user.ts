import { UserDocument } from "@/types/api";
import axios from "axios";
import { baseUrl, getAuthToken } from "./config";

const url = `${baseUrl}/user`;

// /profile

async function getProfile() {
  const token = await getAuthToken();

  const resp = await axios.get(`${url}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.data.data as UserDocument;
}

export { getProfile };
