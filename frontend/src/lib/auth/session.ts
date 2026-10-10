import type { Role } from "../types";

export const SESSION_COOKIE = "session";

export interface Session {
  name: string;
  role: Role;
  exp: number;
}

// The signature is not checked here: the session only drives routing and display,
// and the API verifies the token on every request it serves.
export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const session = JSON.parse(atob(payload)) as Session;
    return session.exp * 1000 > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export const homePathFor = (role: Role) =>
  role === "MANAGER" ? "/manager" : "/facilitator";
