import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { DIMENSION_ORDER, DIMENSIONS } from "@/lib/disc";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-4 py-12">
      <p className="text-7xl font-semibold tracking-tight">
        {DIMENSION_ORDER.map((dimension) => (
          <span key={dimension} className={DIMENSIONS[dimension].textClass}>
            {dimension}
          </span>
        ))}
      </p>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">Talentology DISC assessment</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink/80">
        Participants: open the personal link from your invitation to start. Facilitators and
        managers sign in to invite participants and review results.
      </p>
      <Link href="/login" className={`${buttonClasses()} mt-8 self-start`}>
        Staff sign in
      </Link>
    </main>
  );
}
