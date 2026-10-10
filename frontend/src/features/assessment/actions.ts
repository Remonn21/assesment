"use server";

import { redirect } from "next/navigation";
import { submitAssessment } from "@/lib/api/assessment";
import { ApiError } from "@/lib/api/client";
import type { RankedGroup } from "@/lib/types";

export async function submitAssessmentAction(token: string, groups: RankedGroup[]) {
  try {
    await submitAssessment(token, groups);
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    if (error.status !== 409) return { error: error.message };
  }
  redirect(`/assessment/${token}/result`);
}
