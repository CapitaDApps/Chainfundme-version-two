import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/campaign/funder`;

export type FundDataType = {
  userId: string;
  campaignId: string;
  chainId: number;
  tokenAddress: string;
  amount: string;
};

const addFunder = async (data: FundDataType) => {
  const token = await getAuthToken();
  const resp = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log({ addFunderResp: resp.data });
  return resp.data;
};

export { addFunder };
