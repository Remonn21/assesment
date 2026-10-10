import "server-only";
import type { LoginResponse } from "../types";
import { apiFetch } from "./client";

export const login = (email: string, password: string) =>
  apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
