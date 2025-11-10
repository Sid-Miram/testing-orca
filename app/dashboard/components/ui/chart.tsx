"use client";

import * as React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Tooltip as RechartsTooltip,
  type TooltipProps as RTooltipProps,
  type LegendProps,
  type TooltipProps,
  type ValueType,
  type NameType,
} from "recharts";

// If your project uses a different utilities path for `cn`, update this import.
import { cn } from "./utils";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export type ChartIndicator = "dot" | "line" | "dashed";

export type ChartConfig = Record<
  string,
  {
    /** Human label for a series/dataKey. */
    label?: string;
    /** CSS color (used to theme the tooltip indicator). */
    color?: string;
  }
>;

export type ChartContainerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Series config; keys should match your Recharts `dataKey` values. */
  config?: ChartConfig;
};

export type ChartTooltipContentProps = Partial<
  TooltipProps<ValueType, NameType>
> & {
  className?: string;
  indicator?: ChartIndicator;
  hideLabel?: boolean;
};

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const ChartConfigCtx = React.createContext<ChartConfig | undefined>(undefined);

function useChartConfig() {
  return React.useContext(ChartConfigCtx);
}

/* -------------------------------------------------------------------------------------------------
 * Container
 * -----------------------------------------------------------------------------------------------*/

export function ChartContainer({
  children,
  className,
  style,
  config,
}: ChartContainerProps) {
  // Expose series colors as CSS variables so child components can reference them if desired.
  const cssVars: CSSProperties = { ...style };
  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (value?.color) {
        (cssVars as any)[`--color-${key}`] = value.color;
      }
    }
  }

  return (
    <ChartConfigCtx.Provider value={config}>
      <div className={cn("w-full overflow-hidden", className)} style={cssVars}>
        {children}
      </div>
    </ChartConfigCtx.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip (wrapper) — provides sane defaults and our content component
 * -----------------------------------------------------------------------------------------------*/

export function ChartTooltip(
  props: Omit<RTooltipProps<ValueType, NameType>, "content"> & {
    content?: RTooltipProps<ValueType, NameType>["content"];
  },
) {
  const content =
    props.content ?? ((p) => <ChartTooltipContent {...(p as any)} />);

  return (
    <RechartsTooltip
      {...props}
      wrapperStyle={{ outline: "none" }}
      cursor={{
        fill: "hsl(var(--muted, 210 20% 95%))",
        opacity: 0.35,
      }}
      content={content}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip Content — FIXED TYPINGS
 *  - We type against Partial<TooltipProps> so Recharts minor changes don’t break builds.
 *  - Works with single or multi-series payloads.
 * -----------------------------------------------------------------------------------------------*/

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  indicator = "dot",
  hideLabel = false,
}: ChartTooltipContentProps) {
  const config = useChartConfig();

  if (!active || !payload || payload.length === 0) return null;

  // Render all items when multiple series are hovered.
  const items = payload as unknown as Array<{
    color?: string;
    name?: string;
    value?: ValueType;
    dataKey?: string | number;
  }>;

  return (
    <div
      className={cn(
        "rounded-md border bg-popover p-2 text-popover-foreground shadow-md",
        "min-w-[8rem]",
        className,
      )}
    >
      {!hideLabel && (
        <div className="mb-1 text-xs text-muted-foreground">
          {label != null ? String(label) : ""}
        </div>
      )}

      <div className="space-y-1">
        {items.map((it, idx) => {
          // Prefer explicit config label if available.
          const human =
            (typeof it.dataKey === "string" && config?.[it.dataKey]?.label) ??
            it.name ??
            (typeof it.dataKey === "string" ? it.dataKey : `Series ${idx + 1}`);

          const color =
            (typeof it.dataKey === "string" && config?.[it.dataKey]?.color) ??
            it.color;

          return (
            <div key={idx} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex h-2 w-2 rounded-full shrink-0",
                  indicator === "line" && "h-0.5 w-3 rounded-none",
                  indicator === "dashed" && "h-0.5 w-3 rounded-none",
                )}
                style={{
                  background:
                    indicator === "dashed" ? undefined : color ?? "currentColor",
                  borderTop:
                    indicator === "dashed"
                      ? `1px dashed ${color ?? "currentColor"}`
                      : undefined,
                }}
              />
              <span className="text-xs font-medium">{human}</span>
              <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                {it.value != null ? String(it.value) : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * (Optional) Legend content stub, if you need it later.
 * -----------------------------------------------------------------------------------------------*/

export function ChartLegendContent(_props: LegendProps) {
  // Implement as needed for your design system; keeping it minimal here.
  return null;
}

