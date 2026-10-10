"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold">This page didn&apos;t load</h1>
      <p className="mt-2 text-muted">
        The server couldn&apos;t be reached. Nothing you entered was lost. Check your connection
        and try again.
      </p>
      <Button onClick={reset} className="mt-6 self-start">
        Try again
      </Button>
    </main>
  );
}
