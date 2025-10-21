import {
  CampaignDocument,
  ReturnCampaignDocument,
} from "@/types/api/campaign.types";
import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/campaign`;

// /campaign
const getCampaigns = async (): Promise<ReturnCampaignDocument[]> => {
  const resp = await axios.get(url);

  // Use the existing cmid field directly since it exists in the API response
  const campaigns = resp.data.data.campaignData;
  
  return campaigns;
};

// /campaign/:campaignId
const getCampaign = async (
  campaignId: string
): Promise<ReturnCampaignDocument> => {
  const resp = await axios.get(`${url}/${campaignId}`);
  
  // Map _id to cmid to match the expected interface
  const campaign = {
    ...resp.data.data,
    cmid: resp.data.data.cmid,
  };
  
  return campaign;
};

// /campaign/create
const createCampaignDraft = async (data: CampaignDocument) => {
  const token = await getAuthToken();
  const { image, coverImage, otherImages, ...others } = data;
  const body = new FormData();

  for (const [key, val] of Object.entries(others)) {
    body.set(key, val.toString());
  }

  body.append("campaignImages", image);
  body.append("campaignImages", coverImage);

  for (const file of otherImages) {
    body.append("campaignImages", file);
  }

  const resp = await axios.post(`${url}/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.setItem("campaignId", JSON.stringify(resp.data.data.cmid));

  return resp.data.data.cmid;
};

// /campaign/publish/:campaignId
const publishCampaign = async (
  campaignId: string,
  tokens: string[],
  networkId: number
) => {
  const token = await getAuthToken();
  const resp = await axios.post(
    `${url}/publish/${campaignId}`,
    {
      tokenAddresses: tokens,
      networkId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(resp);

  return resp.data.message;
};

// /campaign/end/:campaignId
const endCampaign = async (campaignId: string, networkId: string) => {
  const token = await getAuthToken();
  const resp = await axios.post(
    `${url}/end/${campaignId}`,
    { networkId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log(resp);

  return resp.data.message;
};

export {
  createCampaignDraft,
  publishCampaign,
  getCampaigns,
  getCampaign,
  endCampaign,
};
