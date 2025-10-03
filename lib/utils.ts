import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isPast,
} from "date-fns";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddr(addr: string | undefined, length = 5) {
  if (!addr) return "";
  const firstPart = addr.slice(0, length);
  const secondPart = addr.slice(addr.length - length);
  return `${firstPart}...${secondPart}`;
}

export const handleCopyAddress = async (address: string | undefined) => {
  if (!address) return;
  await navigator.clipboard.writeText(address);
  toast.success("Address copied to clipboard");
};

export async function urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${url}: ${response.statusText}`);
  }

  const blob = await response.blob();
  // The blob will already have a type like "image/png"

  return new File([blob], filename, { type: blob.type });
}

export const formatTimeLeft = (endDate: string) => {
  // Ensure the inputs are valid Date objects
  const end = new Date(endDate);
  const start = new Date();

  // 1. Check if the event has already passed
  if (isPast(end)) {
    return "Event has ended";
  }

  // 2. Calculate the difference in days
  const daysLeft = differenceInDays(end, start);
  if (daysLeft > 0) {
    // If there is one or more full days left, return the number of days
    return `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`;
  }

  // 3. If less than a day, calculate the difference in hours
  const hoursLeft = differenceInHours(end, start);
  if (hoursLeft > 0) {
    // If there is one or more full hours left, return the number of hours
    return `${hoursLeft} hour${hoursLeft > 1 ? "s" : ""} left`;
  }

  // 4. If less than an hour, calculate the difference in minutes
  const minutesLeft = differenceInMinutes(end, start);
  if (minutesLeft > 0) {
    // If there is one or more full minutes left, return the number of minutes
    return `${minutesLeft} minute${minutesLeft > 1 ? "s" : ""} left`;
  }

  // 5. If less than a minute is left
  return "Less than a minute left";
};

export function formatPrice(num: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return formatter.format(num);
}
