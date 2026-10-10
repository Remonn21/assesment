import "server-only";
import type { ParticipantReport, ParticipantSummary } from "../types";
import { apiFetch } from "./client";

export const listParticipants = () =>
  apiFetch<ParticipantSummary[]>("/participants", { auth: true });

export const createParticipant = (name: string, email: string) =>
  apiFetch<ParticipantSummary>("/participants", {
    method: "POST",
    body: { name, email },
    auth: true,
  });

export const getParticipantReport = (id: string) =>
  apiFetch<ParticipantReport>(`/participants/${id}`, { auth: true });
