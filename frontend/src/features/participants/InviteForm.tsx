"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { inviteAction } from "./actions";
import { CopyLinkButton } from "./CopyLinkButton";

export function InviteForm() {
  const [state, formAction, isPending] = useActionState(inviteAction, {});
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.location.hash === "#invite") nameInput.current?.focus();
  }, []);

  return (
    <div className="space-y-4">
      <form action={formAction} className="grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <TextField
          ref={nameInput}
          label="Full name"
          name="name"
          defaultValue={state.values?.name}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          defaultValue={state.values?.email}
          required
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding…" : "Add participant"}
        </Button>
      </form>
      {state.error && (
        <p role="alert" className="text-sm text-danger-text">
          {state.error}
        </p>
      )}
      {state.invited && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg bg-success-soft px-4 py-3">
          <p className="text-sm">
            <bdi>{state.invited.name}</bdi> was added. Send them their personal link.
          </p>
          <CopyLinkButton token={state.invited.inviteToken} />
        </div>
      )}
    </div>
  );
}
