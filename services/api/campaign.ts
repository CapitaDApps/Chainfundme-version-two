import {
  CampaignDocument,
  ReturnCampaignDocument,
} from "@/types/api/campaign.types";
import { getAuthToken } from "./config";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";

const prodUrl = `${url}/api/v1/campaign`;

const baseUrl =
  process.env.NEXT_PUBLIC_PRODUCTION == "true" ? prodUrl : "/api/campaign";

const getCampaigns = async (): Promise<ReturnCampaignDocument[]> => {
  // /
  const resp = await axios.get(baseUrl);
  return resp.data.data.campaignData;
};

const getCampaign = async (
  campaignId: string
): Promise<ReturnCampaignDocument> => {
  // /:campaignId
  const resp = await axios.get(`${baseUrl}/${campaignId}`);
  console.log({ campaign: resp.data.data });
  return resp.data.data;
};

const createCampaignDraft = async (data: CampaignDocument) => {
  // /create
  const token = await getAuthToken();
  const { image, coverImage, otherImages, ...others } = data;
  const body = new FormData();

  for (const [key, val] of Object.entries(others)) {
    console.log([key, val]);
    body.set(key, val.toString());
  }

  body.append("campaignImages", image);
  body.append("campaignImages", coverImage);

  for (const file of otherImages) {
    body.append("campaignImages", file);
  }

  const resp = await axios.post(`${baseUrl}/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log({ cmid: resp.data.data.cmid });

  localStorage.setItem("campaignId", JSON.stringify(resp.data.data.cmid));

  return resp.data.data.cmid;
};

const publishCampaign = async (campaignId: string) => {
  // /publish/:campaignId
  const token = await getAuthToken();
  const resp = await axios.post(
    `${baseUrl}/publish/${campaignId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data.message;
};

export { createCampaignDraft, publishCampaign, getCampaigns, getCampaign };
