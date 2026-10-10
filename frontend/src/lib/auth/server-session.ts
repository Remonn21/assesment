import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeSession, SESSION_COOKIE } from "./session";

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decodeSession(token);
}

export async function requireSessionToken() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!decodeSession(token)) redirect("/login");
  return token;
}
