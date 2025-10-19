"use client";

import { TwitterShareButton, TwitterIcon } from "next-share";
import { useEffect, useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareModalProps {
  campaignId: string;
  shareModalOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({
  campaignId,
  shareModalOpen,
  onClose,
}: ShareModalProps) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const campaignUrl = useMemo(() => {
    return `${origin}/campaigns/${campaignId}`;
  }, [origin, campaignId]);

  const shareText =
    "Hooyah!!! I just launched my campaign on ChainFundMe and I need your help to make it happen! Every donation brings me closer to my goal. Support me today 🙏\n\n";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  if (!shareModalOpen) return null;

  return (
    <div className="h-[100dvh] fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-5 px-3 w-full max-w-[300px] text-center space-y-4 max-h-[90vh] overflow-y-auto animate-fade-in">
        <h2 className="text-lg font-semibold text-black">
          Share your campaign?
        </h2>
        <p className="text-sm text-gray-600">
          Let your network know you&apos;re raising funds on-chain.
        </p>

        <div className="flex items-center justify-center gap-4 mt-4">
          {/* X */}
          <TwitterShareButton url="" title={`${shareText}\n\n${campaignUrl}`}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          {/* Farcaster */}
          <a
            href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
              shareText + " " + campaignUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <img
              src="/Farcaster.svg"
              alt="Farcaster"
              width={40}
              height={40}
              className="rounded-full"
            />
          </a>

          {/* Email  */}
          <a
            href={`mailto:?subject=Support my campaign on ChainFundMe&body=${encodeURIComponent(
              shareText + "\n\n" + campaignUrl
            )}`}
            className="hover:opacity-80 bg-[#023cee]/10 p-2 rounded-full"
            aria-label="Share via Email"
          >
            <Mail className="text-gray-600 w-8 h-8" />
          </a>
        </div>

        <div className="flex flex-col gap-y-2">
          <Button
            onClick={handleCopy}
            className="mt-6 text-sm text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Copy Link
          </Button>
          <Button
            variant={"ghost"}
            onClick={onClose}
            className="mt-2 text-sm text-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeInScale 0.25s ease-out forwards;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
