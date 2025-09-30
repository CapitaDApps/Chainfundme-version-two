import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/campaign/comments`;

// comments/create
const addComment = async (campaignId: string, comment: string) => {
  const token = await getAuthToken();

  const resp = await axios.post(
    `${url}/create`,
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
    `${url}/like/${commentId}`,
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
    `${url}/reply/${commentId}`,
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
    `${url}/reply/like/${replyId}`,
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
