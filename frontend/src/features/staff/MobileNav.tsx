"use client";

import { Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";

export function MobileNav({ sidebar }: { sidebar: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className="-ms-2 grid size-12 place-items-center rounded-md text-ink hover:bg-paper lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
        >
          <div aria-hidden className="absolute inset-0 bg-ink/40" onClick={() => setIsOpen(false)} />
          <aside
            className="relative flex h-full w-72 flex-col bg-surface"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) setIsOpen(false);
            }}
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              autoFocus
              onClick={() => setIsOpen(false)}
              className="absolute top-3 end-2 grid size-12 place-items-center rounded-md text-muted hover:bg-paper"
            >
              <X className="size-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}
    </>
  );
}
