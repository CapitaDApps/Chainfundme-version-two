"use client";

import { initialNotifications } from "@/lib/NotificationContent";
import { Notification } from "@/types/notification";
import { useUser } from "@privy-io/react-auth";
import Image from "next/image";
import { useState } from "react";
import DonationModel from "../Donation/DonationModel";
import Empty from "./Empty";

function NotificationPageClient() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const { user } = useUser();

  const allRead = notifications.every((n) => n.read);

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  if (!user)
    return <DonationModel text="Join or Sign In to start getting notified" />;

  return (
    <div>
      <div className="p-6 pb-12 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-[40px] md:mb-[50px]">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-sidebar-content">
                Notifications
              </h1>
            </div>
            <div className="md:ml-4 md:w-auto">
              <button
                onClick={markAllAsRead}
                disabled={notifications.length === 0}
                className={`inline-flex text-base justify-center items-center gap-2 bg-white text-[#2275B9] px-4 py-2 rounded-xl shadow-xl cursor-pointer hover:shadow-lg transition border disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Mark all as read
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <Empty />
          ) : (
            <div className="border border-[#b3b3b3]/40 rounded-4xl p-4 sm:p-6 ">
              <div className="divide-y divide-[#b3b3b3]/50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-4 items-start py-3 sm:py-4 ${
                      n.read ? "opacity-80" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center text-sm sm:text-base text-white ${n.iconBg}`}
                        aria-hidden
                      >
                        <span>{n.iconEmoji}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-row justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-col items-start gap-1">
                              <h3 className="text-sm sm:text-base font-medium text-black truncate">
                                {n.title}
                              </h3>
                              <span className="text-xs text-slate-400">
                                {n.time}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-disabled-text leading-relaxed">
                              {n.description}
                            </p>
                            {n.amount && (
                              <div className="flex-shrink-0 gap-4 mt-3">
                                <span className="inline-flex items-center px-4 py-2 border border-slate-600 rounded-full text-xs font-bold text-[#666666]">
                                  {n.amount}
                                </span>
                                <span className="ml-3 text-xs text-disabled-text">
                                  {n.destination}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {!allRead && (
                          <div className="">
                            <Image
                              src="/layout/dot.png"
                              alt="notification"
                              width={15}
                              height={15}
                              className="text-[#003DEF]"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  className="text-sm text-slate-400 hover:text-black transition"
                  onClick={() => alert("Load more (mock)")}
                >
                  Load more
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPageClient;
