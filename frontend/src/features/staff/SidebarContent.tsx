import { LayoutDashboard, LogOut, UserCircle, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/Button";
import { logoutAction } from "@/features/auth/actions";
import type { Session } from "@/lib/auth/session";
import type { Role } from "@/lib/types";

const ROLE_LABELS: Record<Role, string> = {
  MANAGER: "HR manager",
  FACILITATOR: "Facilitator",
};

export function SidebarContent({ session }: { session: Session }) {
  return (
    <>
      <div className="border-b border-line p-6">
        <p className="font-bold">Talentology DISC</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <p className="px-3 pb-1 text-[10px] font-bold tracking-wider text-muted uppercase">
          Assessment
        </p>
        <div className="space-y-1">
          {session.role === "MANAGER" && (
            <NavLink href="/manager" icon={<LayoutDashboard />}>
              Overview
            </NavLink>
          )}
          <NavLink href="/facilitator" icon={<Users />}>
            Participants
          </NavLink>
        </div>
      </nav>

      <div className="border-t border-line p-4">
        <div className="mb-2 flex items-center gap-3 px-3 py-2">
          <div className="grid size-8 place-items-center rounded-full bg-line">
            <UserCircle className="size-5 text-muted" />
          </div>
          <div className="min-w-0 flex-1">
            <p dir="auto" className="truncate text-xs font-medium">{session.name}</p>
            <p className="text-xs text-muted">{ROLE_LABELS[session.role]}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="quiet" className="w-full justify-start">
            <LogOut />
            Sign out
          </Button>
        </form>
      </div>
    </>
  );
}
