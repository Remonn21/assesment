import "server-only";
import { notFound, redirect } from "next/navigation";
import { requireSessionToken } from "../auth/server-session";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

interface ApiOptions {
  method?: "GET" | "POST";
  body?: unknown;
  auth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  { method = "GET", body, auth = false }: ApiOptions = {},
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) headers.Authorization = `Bearer ${await requireSessionToken()}`;

  const response = await fetch(`${process.env.API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });

  if (response.status === 401 && auth) redirect("/login");
  if (!response.ok) throw new ApiError(response.status, await errorMessage(response));
  return response.json() as Promise<T>;
}

async function errorMessage(response: Response) {
  const body = (await response.json().catch(() => null)) as {
    message?: string | string[];
  } | null;
  const message = body?.message ?? response.statusText;
  return Array.isArray(message) ? message.join(", ") : message;
}

export function notFoundIfMissing(error: unknown): never {
  if (error instanceof ApiError && [400, 404].includes(error.status)) notFound();
  throw error;
}
