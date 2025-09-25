"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = {
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  initialMonth?: Date;
  className?: string;
  mode?: "single" | "range";
  initialFocus?: boolean;
  compact?: boolean; // optional flag for compact sizing
};

function Calendar({
  selected,
  onSelect,
  disabled,
  initialMonth,
  className,
  compact = true,
  initialFocus,
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    initialMonth ? startOfMonth(initialMonth) : startOfMonth(new Date())
  );

  React.useEffect(() => {
    if (initialMonth) {
      setMonth(startOfMonth(initialMonth));
    }

    if (initialFocus) {
    }
  }, [initialMonth, initialFocus]);

  const prevMonth = React.useCallback(
    () => setMonth((m) => startOfMonth(subMonths(m, 1))),
    []
  );
  const nextMonth = React.useCallback(
    () => setMonth((m) => startOfMonth(addMonths(m, 1))),
    []
  );

  // build the visible days from startOfWeek(startOfMonth) -> endOfWeek(endOfMonth)
  const start = startOfWeek(startOfMonth(month));
  const end = endOfWeek(endOfMonth(month));

  const days: Date[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) {
    days.push(d);
    // prevent infinite loop in case of timezone issues
    if (days.length > 42) break;
  }

  const handleSelect = (date: Date) => {
    if (disabled && disabled(date)) return;
    onSelect?.(date);
  };

  // even more compact sizing for a mini modal footprint
  const containerW = compact ? "w-[220px]" : "w-[280px]";
  const pad = compact ? "p-1" : "p-2";
  const headText = compact ? "text-[11px]" : "text-sm";
  const iconSize = compact ? "w-3 h-3" : "w-4 h-4";
  const weekdaySize = compact ? "w-5 h-5" : "w-8 h-8";
  const daySize = compact ? "w-7 h-7" : "w-10 h-10";
  const dayText = compact ? "text-xs" : "text-sm";
  const gap = compact ? "gap-0" : "gap-1";

  return (
    <div
      className={cn(
        "bg-white text-white border border-primary/30 rounded-md shadow-md",
        pad,
        containerW,
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={prevMonth}
          className="p-1 rounded hover:bg-white/5"
        >
          <ChevronLeft className={cn(iconSize, "text-zinc-800")} />
        </button>

        <div className={cn(headText, "font-semibold text-primary")}>
          {format(month, "LLLL yyyy")}
        </div>

        <button
          type="button"
          aria-label="Next month"
          onClick={nextMonth}
          className="p-1 rounded hover:bg-white/5"
        >
          <ChevronRight className={cn(iconSize, "text-zinc-800")} />
        </button>
      </div>

      <div className={cn("grid grid-cols-7", gap, "text-zinc-400 mb-2")}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className={cn(
              weekdaySize,
              "flex items-center text-xs justify-center text-zinc-700"
            )}
          >
            {d}
          </div>
        ))}
      </div>

      <div className={cn("grid grid-cols-7", gap)}>
        {days.map((day) => {
          const inMonth = day.getMonth() === month.getMonth();
          const disabledDay = disabled ? disabled(day) : false;
          const selectedDay = selected ? isSameDay(selected, day) : false;
          const today = isToday(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleSelect(day)}
              disabled={disabledDay}
              className={cn(
                daySize,
                "rounded-md flex text-zinc-600 items-center cursor-pointer justify-center",
                !inMonth && "text-zinc-600",
                disabledDay && "opacity-40 cursor-not-allowed",
                selectedDay && "bg-primary text-white  font-semibold",
                today && !selectedDay && "ring-1 ring-primary/50 bg-primary/20 text-black",
                dayText
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
