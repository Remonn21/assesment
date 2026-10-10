import "server-only";
import type { Assessment, RankedGroup, ResultReport } from "../types";
import { apiFetch } from "./client";

export const getAssessment = (token: string) =>
  apiFetch<Assessment>(`/assessment/${token}`);

export const submitAssessment = (token: string, groups: RankedGroup[]) =>
  apiFetch<ResultReport>(`/assessment/${token}/submit`, {
    method: "POST",
    body: { groups },
  });

export const getResult = (token: string) =>
  apiFetch<ResultReport>(`/assessment/${token}/result`);
