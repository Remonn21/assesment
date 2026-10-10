"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import type { ReactNode } from "react";

interface SortableWordProps {
  id: number;
  text: string;
  isSelected: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SortableWord({
  id,
  text,
  isSelected,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: SortableWordProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  const isHighlighted = isDragging || isSelected;

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`relative flex touch-manipulation items-center gap-3 rounded-lg border py-2 pe-2 ps-3 select-none ${
        isDragging ? "z-10 cursor-grabbing shadow-lg shadow-accent/15" : "cursor-grab"
      } ${
        isHighlighted
          ? "border-accent bg-accent-soft ring-2 ring-accent/30"
          : "border-line bg-surface hover:border-line-strong"
      }`}
    >
      <GripVertical aria-hidden className="size-4 shrink-0 text-muted" />
      <span className="flex-1 text-lg font-medium">{text}</span>
      <MoveButton label={`Move ${text} up`} disabled={!canMoveUp} onClick={onMoveUp}>
        <ChevronUp className="size-4" />
      </MoveButton>
      <MoveButton label={`Move ${text} down`} disabled={!canMoveDown} onClick={onMoveDown}>
        <ChevronDown className="size-4" />
      </MoveButton>
    </li>
  );
}

function MoveButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      // The whole row listens for drags; keep presses on this button from starting one.
      onPointerDown={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      className="grid size-12 cursor-pointer place-items-center rounded-md text-muted hover:bg-surface hover:text-accent-text disabled:invisible"
    >
      {children}
    </button>
  );
}
