import { type ComponentProps, useId } from "react";

export function TextField({ label, ...props }: ComponentProps<"input"> & { label: string }) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="h-12 w-full rounded-md border border-line bg-field px-3 text-base text-ink sm:h-10 sm:text-sm transition-colors outline-none placeholder:text-muted focus:border-accent focus:bg-surface focus:ring-[3px] focus:ring-accent/20"
        {...props}
      />
    </div>
  );
}
