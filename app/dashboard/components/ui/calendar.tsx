// app/dashboard/components/ui/calendar.tsx
"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps, type IconProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";

type CalendarProps = DayPickerProps;

/**
 * DayPicker with styled header + typed icons (IconLeft/Right).
 * Keep your existing props/usage the same.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-white/80 font-medium",
        nav: "flex items-center gap-1 absolute right-1 top-1",
        nav_button:
          "h-7 w-7 inline-flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:text-white hover:bg-white/5",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7",
        head_cell: "text-white/60 w-9 font-normal",
        row: "grid grid-cols-7 mt-1",
        cell: "h-9 w-9 text-center align-middle",
        day: cn(
          "h-9 w-9 rounded-md inline-flex items-center justify-center",
          "hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
        ),
        day_selected: "bg-sky-600 text-white hover:bg-sky-600",
        day_today: "text-sky-400",
        day_outside: "text-white/40 opacity-60",
        day_disabled: "text-white/30 opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: (iconProps: IconProps) => (
          <ChevronLeft className="h-4 w-4" {...iconProps} />
        ),
        IconRight: (iconProps: IconProps) => (
          <ChevronRight className="h-4 w-4" {...iconProps} />
        ),
      }}
      {...props}
    />
  );
}

