import type { Dimension } from "./types";

export const DIMENSION_ORDER: Dimension[] = ["D", "I", "S", "C"];

export const DIMENSIONS: Record<
  Dimension,
  { label: string; color: string; textClass: string; bgClass: string }
> = {
  D: { label: "Dominance", color: "var(--disc-d)", textClass: "text-disc-d", bgClass: "bg-disc-d" },
  I: { label: "Influence", color: "var(--disc-i)", textClass: "text-disc-i", bgClass: "bg-disc-i" },
  S: { label: "Steadiness", color: "var(--disc-s)", textClass: "text-disc-s", bgClass: "bg-disc-s" },
  C: { label: "Compliance", color: "var(--disc-c)", textClass: "text-disc-c", bgClass: "bg-disc-c" },
};

export const MAX_DIMENSION_SCORE = 56;

export const CHART_TOOLTIP_STYLE = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  color: "var(--ink)",
};
