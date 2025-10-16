"use client";

import { formatNotificationTimeMessage } from "@/lib/utils";
import { useUserProfile } from "@/services/api/hooks/user/useUserProfile";
import { useUser } from "@privy-io/react-auth";
import Image from "next/image";
import DonationModel from "../Donation/DonationModel";
import Empty from "./Empty";
import { getNotifications } from "./conf";
import { useReadNotification } from "@/services/api/hooks/notification/useReadNotification";
import { BeatLoader } from "react-spinners";

function NotificationPageClient() {
  const { userProfile } = useUserProfile();
  const { user } = useUser();

  const { readNotification, isReading } = useReadNotification();

  const userNotification = userProfile?.notifications;

  const notifications = getNotifications(userNotification);

  const allRead = notifications?.every((n) => n.status == "read");

  function markAllAsRead() {
    readNotification(undefined);
  }

  if (!user)
    return <DonationModel text="Join or Sign In to start getting notified" />;

  return (
    <div className="mb-20">
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
                disabled={!notifications || notifications?.length === 0}
                className={`inline-flex text-base justify-center items-center gap-2 bg-white text-[#2275B9] px-4 py-2 rounded-xl shadow-xl cursor-pointer hover:shadow-lg transition border disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isReading ? <BeatLoader size={10} /> : "Mark all as read"}
              </button>
            </div>
          </div>

          {notifications?.length === 0 ? (
            <Empty />
          ) : (
            <div className="border border-[#b3b3b3]/40 rounded-4xl p-4 sm:p-6 h-[100dvh] max-h-[100dvh] overflow-y-auto">
              <div className="space-y-4">
                {notifications?.map((n) => (
                  <div
                    key={n._id}
                    className={`flex gap-4 items-start py-3 sm:py-4 bg-gray-100 px-3 rounded-xl ${
                      n.status === "read" ? "opacity-80" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full text-sm sm:text-base text-white flex justify-center items-center ${n.iconBg}`}
                        aria-hidden
                      >
                        <p>{n.emoji}</p>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-row justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-col items-start gap-1">
                              <h3 className="text-sm sm:text-base font-bold text-secondary-text truncate">
                                {n.title}
                              </h3>
                              <span className="text-xs text-slate-400 -mt-1.5">
                                {formatNotificationTimeMessage(n.createdAt)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-disabled-text leading-relaxed">
                              {n.body}
                            </p>
                            {/* {n.amount && (
                              <div className="flex-shrink-0 gap-4 mt-3">
                                <span className="inline-flex items-center px-4 py-2 border border-slate-600 rounded-full text-xs font-bold text-[#666666]">
                                  {n.amount}
                                </span>
                                <span className="ml-3 text-xs text-disabled-text">
                                  {n.destination}
                                </span>
                              </div>
                            )} */}
                          </div>
                        </div>
                        {n.status === "unread" && (
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

              {/* <div className="mt-6 text-center">
                <button
                  className="text-sm text-slate-400 hover:text-black transition"
                  onClick={() => alert("Load more (mock)")}
                >
                  Load more
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPageClient;
