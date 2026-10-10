"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api/client";
import { createParticipant } from "@/lib/api/participants";

export interface InviteState {
  error?: string;
  values?: { name: string; email: string };
  invited?: { name: string; inviteToken: string };
}

export async function inviteAction(_: InviteState, formData: FormData): Promise<InviteState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  try {
    const participant = await createParticipant(values.name, values.email);
    revalidatePath("/facilitator");
    return { invited: { name: participant.name, inviteToken: participant.inviteToken } };
  } catch (error) {
    if (error instanceof ApiError && [400, 409].includes(error.status)) {
      return { error: error.message, values };
    }
    throw error;
  }
}
