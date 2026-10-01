import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

type ChartType = "line" | "bar" | "area";
type ChartValue = string | number;
type ChartDatum = Record<string, ChartValue>;

interface ChartSeries {
  dataKey: string;
  label: string;
  color: string;
}

export interface ChartPayload {
  type: ChartType;
  title: string;
  xKey: string;
  data: ChartDatum[];
  series: ChartSeries[];
  height: number;
  showGrid: boolean;
  showLegend: boolean;
  showTooltip: boolean;
}

interface ChartRendererProps {
  chart: ChartPayload;
  className?: string;
  isAnimationActive?: boolean;
}

const CHART_MARGIN = { top: 8, right: 8, bottom: 0, left: 0 } as const;

function buildConfig(series: readonly ChartSeries[]): ChartConfig {
  const config: ChartConfig = {};
  for (const { dataKey, label, color } of series) {
    config[dataKey] = { label, color };
  }
  return config;
}

export function ChartRenderer({
  chart,
  className,
  isAnimationActive = false,
}: ChartRendererProps) {
  const {
    type,
    data,
    series,
    xKey,
    height,
    showGrid,
    showLegend,
    showTooltip,
  } = chart;

  const config = useMemo(() => buildConfig(series), [series]);

  const axes = (
    <>
      {showGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}

      <XAxis
        dataKey={xKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={24}
        interval="preserveStartEnd"
      />

      <YAxis width="auto" tickLine={false} axisLine={false} />

      {showTooltip && (
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      )}

      {showLegend && <ChartLegend content={<ChartLegendContent />} />}
    </>
  );

  return (
    <ChartContainer
      config={config}
      className={cn(
        "aspect-auto block w-full min-w-0 max-w-full overflow-hidden",
        className,
      )}
      style={{ height }}
    >
      {type === "bar" ? (
        <BarChart accessibilityLayer data={data} margin={CHART_MARGIN}>
          {axes}
          {series.map((s) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              fill={s.color}
              radius={4}
              isAnimationActive={isAnimationActive}
            />
          ))}
        </BarChart>
      ) : type === "area" ? (
        <AreaChart accessibilityLayer data={data} margin={CHART_MARGIN}>
          {axes}
          {series.map((s) => (
            <Area
              key={s.dataKey}
              dataKey={s.dataKey}
              stroke={s.color}
              fill={s.color}
              fillOpacity={0.18}
              type="monotone"
              isAnimationActive={isAnimationActive}
            />
          ))}
        </AreaChart>
      ) : (
        <LineChart accessibilityLayer data={data} margin={CHART_MARGIN}>
          {axes}
          {series.map((s) => (
            <Line
              key={s.dataKey}
              dataKey={s.dataKey}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              type="monotone"
              isAnimationActive={isAnimationActive}
            />
          ))}
        </LineChart>
      )}
    </ChartContainer>
  );
}
