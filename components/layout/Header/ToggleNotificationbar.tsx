import React, { useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { initialNotifications } from "@/lib/notification";

function ToggleNotificationbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!(e.target as Node) || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="w-full  px-9 flex items-center justify-between py-[14px]">
      <div className="flex items-center gap-3" ref={ref}>
        <div className="relative">
          <button
            aria-label="Notifications"
            className="p-2 text-sidebar-content cursor-pointer  rounded-md"
            onClick={() => setOpen((o) => !o)}
          >
            <IoIosNotifications className="w-5 h-5" />
          </button>
          <span
            style={{
              background:
                "linear-gradient(270.05deg, #003def 68.33%, #001f7a 114.25%)",
            }}
            className="absolute -top-0.5 right-1 bg-primary text-background text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center"
          >
            {initialNotifications.filter((n) => !n.read).length}
          </span>

          {open && (
            <div className="absolute right-0 mt-2 w-[320px] bg-sidebar border border-disabled-text/50 rounded-lg shadow-lg z-50">
              <div className="p-3">
                <h4 className="text-sm font-semibold text-sidebar-content">
                  Notifications
                </h4>
                <div className="mt-2 max-h-56 overflow-y-auto divide-y divide-disabled-text/30">
                  {initialNotifications.slice(0, 5).map((n) => (
                    <div key={n.id} className="py-2 flex items-start gap-2">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sidebar-content ${n.iconBg}`}
                      >
                        {n.iconEmoji}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-sidebar-content truncate">
                          {n.title}
                        </div>
                        <div className="text-xs text-slate-400">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <a
                    href="/notifications"
                    className="text-sm underline text-sidebar-content hover:text-disabled-text"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToggleNotificationbar;
