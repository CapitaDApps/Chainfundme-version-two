"use client";

import { ReturnCampaignDocument } from "@/types/api";
import { useEffect, useState } from "react";
import { getCampaign } from "../campaign";

export function useCache() {
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [gettingCache, setGettingCache] = useState(true);
  const [cachedData, setCachedData] = useState<ReturnCampaignDocument>();

  useEffect(() => {
    setCampaignId(localStorage.getItem("campaignId"));
  }, []);

  useEffect(() => {
    (async () => {
      if (campaignId) {
        const data = await getCampaign(JSON.parse(campaignId));
        setCachedData(data);
        setGettingCache(false);
      } else {
        setGettingCache(false);
      }
    })();
  }, [campaignId]);

  return { cachedData, gettingCache };
}
