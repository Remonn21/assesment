"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import type { AssessmentGroup } from "@/lib/types";
import { SortableWord } from "./SortableWord";

interface GroupRankerProps {
  group: AssessmentGroup;
  order: number[];
  onChange: (order: number[]) => void;
}

export function GroupRanker({ group, order, onChange }: GroupRankerProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const [selectedId, setSelectedId] = useState<number>();
  const textById = new Map(group.words.map((word) => [word.id, word.text]));

  function move(from: number, to: number) {
    setSelectedId(order[from]);
    onChange(arrayMove(order, from, to));
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    move(order.indexOf(Number(active.id)), order.indexOf(Number(over.id)));
  }

  return (
    <div>
      <p className="pb-3 text-sm font-medium text-accent-text">Most like me</p>
      <DndContext
        id={`group-${group.id}`}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2">
            {order.map((id, index) => (
              <SortableWord
                key={id}
                id={id}
                text={textById.get(id) ?? ""}
                isSelected={id === selectedId}
                canMoveUp={index > 0}
                canMoveDown={index < order.length - 1}
                onMoveUp={() => move(index, index - 1)}
                onMoveDown={() => move(index, index + 1)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
      <p className="pt-3 text-sm text-muted">Least like me</p>
    </div>
  );
}
