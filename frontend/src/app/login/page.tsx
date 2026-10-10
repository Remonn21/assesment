import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/LoginForm";
import { getSession } from "@/lib/auth/server-session";
import { homePathFor } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect(homePathFor(session.role));

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center font-bold">Talentology DISC</p>
        <section className="rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight">Staff sign in</h1>
          <p className="mt-1 mb-6 text-sm text-muted">
            Sign in to invite participants and review results.
          </p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
