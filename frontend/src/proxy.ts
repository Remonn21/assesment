import { type NextRequest, NextResponse } from "next/server";
import { decodeSession, homePathFor, SESSION_COOKIE } from "@/lib/auth/session";

export function proxy(request: NextRequest) {
  const session = decodeSession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/manager") && session.role !== "MANAGER") {
    return NextResponse.redirect(new URL(homePathFor(session.role), request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/facilitator/:path*", "/manager/:path*"],
};
