import "server-only";
import type { DashboardSummary } from "../types";
import { apiFetch } from "./client";

export const getDashboardSummary = () =>
  apiFetch<DashboardSummary>("/dashboard/summary", { auth: true });
