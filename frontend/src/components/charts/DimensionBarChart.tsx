"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_TOOLTIP_STYLE, DIMENSION_ORDER, DIMENSIONS } from "@/lib/disc";
import type { DimensionScores } from "@/lib/types";

interface DimensionBarChartProps {
  values: DimensionScores;
  valueLabel: string;
  max?: number;
}

export function DimensionBarChart({ values, valueLabel, max }: DimensionBarChartProps) {
  const data = DIMENSION_ORDER.map((dimension) => ({
    dimension,
    label: DIMENSIONS[dimension].label,
    value: values[dimension],
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
          <XAxis
            dataKey="dimension"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted)" }}
          />
          <YAxis hide domain={[0, max ?? "auto"]} />
          <Tooltip
            cursor={{ fill: "var(--accent-soft)" }}
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(value) => [value, valueLabel]}
            labelFormatter={(_, payload) => payload?.[0]?.payload.label}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56} isAnimationActive={false}>
            <LabelList dataKey="value" position="top" className="fill-ink text-sm" />
            {data.map(({ dimension }) => (
              <Cell key={dimension} fill={DIMENSIONS[dimension].color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
