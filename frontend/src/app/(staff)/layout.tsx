import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/features/staff/Breadcrumbs";
import { MobileNav } from "@/features/staff/MobileNav";
import { SidebarContent } from "@/features/staff/SidebarContent";
import { getSession } from "@/lib/auth/server-session";

export default async function StaffLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const sidebar = <SidebarContent session={session} />;

  return (
    <div className="flex h-dvh">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-2 border-b border-line bg-surface px-4 py-4 sm:px-8">
          <MobileNav sidebar={sidebar} />
          <Breadcrumbs />
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
