"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight, type LucideProps } from "lucide-react";
import { cn } from "./utils";

// Define icon component types
type CustomIcon = (props: LucideProps) => React.ReactNode;
type CustomComponents = {
  IconLeft?: CustomIcon;
  IconRight?: CustomIcon;
};

// Add `required` as an optional prop we swallow
export type CalendarProps = Omit<DayPickerProps, "components"> & {
  required?: boolean;
  components?: Partial<CustomComponents>;
};

export function Calendar({
  className,
  components,
  required: _required, // strip `required`
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      // Handle icons safely with version flexibility
      components={
        {
          IconLeft: (iconProps: LucideProps) => (
            <ChevronLeft className="h-4 w-4" {...(iconProps as any)} />
          ),
          IconRight: (iconProps: LucideProps) => (
            <ChevronRight className="h-4 w-4" {...(iconProps as any)} />
          ),
          ...(components as any),
        } as any
      }
      {...(props as any)}
    />
  );
}

