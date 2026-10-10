export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-bold">This link isn&apos;t valid</h1>
      <p className="mt-2 text-muted">
        The invite link may be incomplete or out of date. Ask your facilitator to send it again.
      </p>
    </main>
  );
}
