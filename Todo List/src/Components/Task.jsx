import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        className="task-box"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <input
          type="checkbox"
          className="check-box"
        />
        {title}
      </div>
    </>
  );
};

export default Task;
