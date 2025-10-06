import { UserDocument } from "@/types/api";
import axios from "axios";
import { baseUrl, getAuthToken } from "./config";

const url = `${baseUrl}/user`;

// /profile
export type updateProfileType = {
  name?: string;
  bio?: string;
}

export type followUserType = {
  userId: string
}

async function getProfile() {
  const token = await getAuthToken();

  const resp = await axios.get(`${url}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(resp.data);

  return resp.data.data as UserDocument;
}

async function updateProfile(data: updateProfileType) {
    const token = await getAuthToken();
    const requestUrl = `${url}/profile`;
    
    const resp = await axios.post(requestUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("Update Profile Response:", resp.data);
    return resp.data.data as UserDocument;
}

async function followUser(data: followUserType) {
  const token = await getAuthToken();
  const resp = await axios.post(`${url}/follow`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return resp.data.data;
}

export { getProfile, updateProfile, followUser };
