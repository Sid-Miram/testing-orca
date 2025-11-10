"use client";

import * as React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Tooltip as RechartsTooltip,
  // NOTE: some Recharts versions don't export these types consistently.
  // We only import the component and keep our own light typings below.
} from "recharts";

// If your `cn` lives elsewhere, tweak this import:
import { cn } from "./utils";

/* -------------------------------------------------------------------------------------------------
 * Light, version-agnostic tooltip typings
 * -----------------------------------------------------------------------------------------------*/

// The only bits we actually read from Recharts tooltip props.
type TooltipLike = {
  active?: boolean;
  payload?: any[]; // array of { value, name, color, dataKey, ... }
  label?: any;
};

export type ChartIndicator = "dot" | "line" | "dashed";

export type ChartConfig = Record<
  string,
  {
    /** Human label for a series/dataKey. */
    label?: string;
    /** CSS color (used for indicators). */
    color?: string;
  }
>;

export type ChartContainerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Keys should match your Recharts `dataKey`s. */
  config?: ChartConfig;
};

export type ChartTooltipContentProps = Partial<TooltipLike> & {
  className?: string;
  indicator?: ChartIndicator;
  hideLabel?: boolean;
};

/* -------------------------------------------------------------------------------------------------
 * Context for series config (labels/colors)
 * -----------------------------------------------------------------------------------------------*/

const ChartConfigCtx = React.createContext<ChartConfig | undefined>(undefined);
const useChartConfig = () => React.useContext(ChartConfigCtx);

/* -------------------------------------------------------------------------------------------------
 * Container
 * -----------------------------------------------------------------------------------------------*/

export function ChartContainer({
  children,
  className,
  style,
  config,
}: ChartContainerProps) {
  // Expose each series color as a CSS var: --color-<dataKey>
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
 * Tooltip (wrapper) — keeps defaults and wires our content
 * -----------------------------------------------------------------------------------------------*/

type AnyTooltipProps = Record<string, any>;

export function ChartTooltip(
  props: Omit<AnyTooltipProps, "content"> & {
    content?: AnyTooltipProps["content"];
  },
) {
  const content =
    props.content ?? ((p: TooltipLike) => <ChartTooltipContent {...p} />);

  return (
    <RechartsTooltip
      {...props}
      wrapperStyle={{ outline: "none" }}
      cursor={{ fill: "hsl(var(--muted, 210 20% 95%))", opacity: 0.35 }}
      content={content}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip Content — robust to Recharts version differences
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

  const items = payload as Array<{
    color?: string;
    name?: string;
    value?: unknown;
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
          const dk = it.dataKey;
          const human =
            (typeof dk === "string" && config?.[dk]?.label) ??
            it.name ??
            (typeof dk === "string" ? dk : `Series ${idx + 1}`);

          const color =
            (typeof dk === "string" && config?.[dk]?.color) ?? it.color;

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
 * Legend stub (optional)
 * -----------------------------------------------------------------------------------------------*/

export function ChartLegendContent() {
  return null;
}

