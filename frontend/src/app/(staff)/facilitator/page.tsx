import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { InviteForm } from "@/features/participants/InviteForm";
import { ParticipantsTable } from "@/features/participants/ParticipantsTable";
import { listParticipants } from "@/lib/api/participants";

export default async function FacilitatorPage() {
  const participants = await listParticipants();
  const completed = participants.filter(({ status }) => status === "COMPLETED").length;

  return (
    <>
      <PageHeader title="Participants">
        {completed} of {participants.length} have completed the assessment.
      </PageHeader>
      <Card
        id="invite"
        title="Invite a participant"
        description="They get a personal link to take the assessment."
      >
        <InviteForm />
      </Card>
      <Card title="All participants" flush>
        <ParticipantsTable participants={participants} />
      </Card>
    </>
  );
}
