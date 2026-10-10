import { Button } from "@/components/ui/Button";

export function IntroCard({
  name,
  groupCount,
  onStart,
}: {
  name: string;
  groupCount: number;
  onStart: () => void;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">
        Hi <bdi>{name}</bdi>,
      </h1>
      <div className="space-y-3 text-lg leading-relaxed text-ink/80">
        <p>
          You&apos;ll see {groupCount} groups of four words. Put each group in order, from
          the word that describes you best to the one that describes you least.
        </p>
        <p>Go with your first instinct. There are no right or wrong answers.</p>
      </div>
      <Button onClick={onStart} className="w-full sm:w-auto">
        Start the assessment
      </Button>
    </div>
  );
}
