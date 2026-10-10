"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { AssessmentGroup } from "@/lib/types";
import { submitAssessmentAction } from "./actions";
import { GroupRanker } from "./GroupRanker";
import { IntroCard } from "./IntroCard";

interface AssessmentFlowProps {
  token: string;
  participantName: string;
  groups: AssessmentGroup[];
}

export function AssessmentFlow({ token, participantName, groups }: AssessmentFlowProps) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [rankings, setRankings] = useState<Record<number, number[]>>(() =>
    Object.fromEntries(groups.map((group) => [group.id, group.words.map((word) => word.id)])),
  );
  const [error, setError] = useState<string>();
  const [isSubmitting, startSubmitting] = useTransition();

  if (!started) {
    return (
      <IntroCard name={participantName} groupCount={groups.length} onStart={() => setStarted(true)} />
    );
  }

  const group = groups[index];
  const isLast = index === groups.length - 1;

  function submit() {
    startSubmitting(async () => {
      const result = await submitAssessmentAction(
        token,
        groups.map((g) => ({ groupId: g.id, wordIds: rankings[g.id] })),
      );
      setError(result?.error);
    });
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-muted tabular-nums">
          Group {index + 1} of {groups.length}
        </p>
        <ProgressBar value={((index + 1) / groups.length) * 100} label="Assessment progress" />
        <p className="text-ink/80">
          Drag the words, or use the arrows, so the one that describes you best is on top.
        </p>
      </header>

      <GroupRanker
        key={group.id}
        group={group}
        order={rankings[group.id]}
        onChange={(order) => setRankings((prev) => ({ ...prev, [group.id]: order }))}
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger-text">
          {error}
        </p>
      )}

      <nav className="flex items-center justify-between">
        <Button variant="quiet" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          Back
        </Button>
        {isLast ? (
          <Button onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? "Calculating…" : "See my results"}
          </Button>
        ) : (
          <Button onClick={() => setIndex(index + 1)}>Next group</Button>
        )}
      </nav>
    </div>
  );
}
