import { DIMENSIONS } from "@/lib/disc";
import type { Dimension, ResultReport } from "@/lib/types";

export function ProfileHeader({
  label,
  profile,
}: {
  label: string;
  profile: ResultReport["profile"];
}) {
  const letters = profile.code.split("") as Dimension[];

  return (
    <section className="flex flex-col items-center rounded-xl border border-line bg-surface px-6 py-10 text-center">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-3 text-8xl leading-none font-semibold tracking-tight sm:text-9xl">
        {letters.map((letter) => (
          <span key={letter} className={DIMENSIONS[letter].textClass}>
            {letter}
          </span>
        ))}
      </p>
      <p className="mt-3 text-sm text-muted">
        {letters.map((letter) => DIMENSIONS[letter].label).join(" and ")}
      </p>
      <p lang="ar" dir="rtl" className="mt-6 font-arabic text-3xl font-semibold">
        {profile.name}
      </p>
      {profile.keywords.length > 0 && (
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {profile.keywords.map((keyword) => (
            <li
              key={keyword}
              className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent-text"
            >
              {keyword}
            </li>
          ))}
        </ul>
      )}
      {profile.description && (
        <p className="mt-6 max-w-prose leading-relaxed text-ink/80">{profile.description}</p>
      )}
    </section>
  );
}
