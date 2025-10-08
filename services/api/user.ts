import { UserDocument } from "@/types/api";
import axios from "axios";
import { baseUrl, getAuthToken } from "./config";

const url = `${baseUrl}/user`;

// GET /profile
async function getProfile() {
  const token = await getAuthToken();

  const resp = await axios.get(`${url}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.data.data as UserDocument;
}

// POST /profile (with FormData for image upload)
async function updateProfile(data: {
  name?: string;
  bio?: string;
  email?: string;
  profilePicture?: File;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}) {
  const token = await getAuthToken();
  const formData = new FormData();

  // Append fields to FormData
  if (data.name) formData.append("name", data.name);
  if (data.bio) formData.append("bio", data.bio);
  if (data.email) formData.append("email", data.email);
  if (data.profilePicture) formData.append("profilePicture", data.profilePicture);
  
  // Append social links as JSON string or individual fields
  if (data.socialLinks) {
    formData.append("socialLinks", JSON.stringify(data.socialLinks));
  }

  const resp = await axios.post(`${url}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return resp.data.data as UserDocument;
}

export { getProfile, updateProfile };
