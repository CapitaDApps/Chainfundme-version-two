import { getAuthToken } from "./config";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";
const prodUrl = `${url}/api/v1/campaign/comments`;
const baseUrl =
  process.env.NEXT_PUBLIC_PRODUCTION == "true"
    ? prodUrl
    : "/api/campaign/comments";

// comments/create
const addComment = async (campaignId: string, comment: string) => {
  const token = await getAuthToken();

  const resp = await axios.post(
    `${baseUrl}/create`,
    {
      campaignId,
      comment,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

// comments/like/:commendId
const likeComment = async (commentId: string) => {
  const token = await getAuthToken();

  const resp = await axios.put(
    `${baseUrl}/like/${commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

// comments/reply/:campaignId
const addReply = async (commentId: string, reply: string) => {
  const token = await getAuthToken();

  const resp = await axios.post(
    `${baseUrl}/reply/${commentId}`,
    {
      reply,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

// comments/reply/like/:replyId
const likeReply = async (replyId: string) => {
  const token = await getAuthToken();

  const resp = await axios.put(
    `${baseUrl}/reply/like/${replyId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

export { addComment, addReply, likeComment, likeReply };
