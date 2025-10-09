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
  profileImage?: File;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}) {
  const token = await getAuthToken();
  const formData = new FormData();

  // Set fields to FormData
  if (data.name) formData.set("name", data.name);
  if (data.bio) formData.set("bio", data.bio);
  if (data.email) formData.set("email", data.email);
  if (data.profileImage) formData.set("profileImage", data.profileImage);
  
  // Set social links as JSON string
  if (data.socialLinks) {
    formData.set("socialLinks", JSON.stringify(data.socialLinks));
  }

  const resp = await axios.post(`${url}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Note: Don't manually set Content-Type for FormData, axios handles it automatically
    },
  });

  return resp.data.data as UserDocument;
}

export { getProfile, updateProfile };
