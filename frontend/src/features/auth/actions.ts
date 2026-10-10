"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { decodeSession, homePathFor, SESSION_COOKIE } from "@/lib/auth/session";
import type { Role } from "@/lib/types";

export interface LoginState {
  error?: string;
  email?: string;
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  let role: Role;

  try {
    const { accessToken, user } = await login(email, password);
    const session = decodeSession(accessToken);
    (await cookies()).set(SESSION_COOKIE, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: session ? new Date(session.exp * 1000) : undefined,
    });
    role = user.role;
  } catch (error) {
    if (error instanceof ApiError && [400, 401].includes(error.status)) {
      return { error: "Incorrect email or password.", email };
    }
    throw error;
  }

  redirect(homePathFor(role));
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
