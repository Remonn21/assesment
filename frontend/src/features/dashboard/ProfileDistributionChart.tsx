"use client";

import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CHART_TOOLTIP_STYLE } from "@/lib/disc";
import type { DashboardSummary } from "@/lib/types";

export function ProfileDistributionChart({
  distribution,
}: {
  distribution: DashboardSummary["profileDistribution"];
}) {
  if (distribution.length === 0) {
    return (
      <p className="py-8 text-center text-muted">
        Profiles will appear here once participants complete the assessment.
      </p>
    );
  }

  return (
    <div style={{ height: distribution.length * 44 + 16 }} className="w-full">
      <ResponsiveContainer>
        <BarChart data={distribution} layout="vertical" margin={{ top: 0, right: 32, bottom: 0, left: 0 }}>
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="code"
            width={44}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--ink)", fontWeight: 600 }}
          />
          <Tooltip
            cursor={{ fill: "var(--accent-soft)" }}
            contentStyle={CHART_TOOLTIP_STYLE}
            formatter={(value) => [value, "Participants"]}
            labelFormatter={(code, payload) => `${code} ${payload?.[0]?.payload.name ?? ""}`}
          />
          <Bar
            dataKey="count"
            fill="var(--accent)"
            radius={[0, 6, 6, 0]}
            maxBarSize={28}
            isAnimationActive={false}
          >
            <LabelList dataKey="count" position="right" className="fill-ink text-sm" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
