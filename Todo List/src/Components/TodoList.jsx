import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Task from "./Task";

const TodoList = ({ task }) => {
  return (
    <>
      <div className="container">
        <SortableContext
          items={task}
          strategy={verticalListSortingStrategy}
        >
          {task.map((item) => (
            <Task
              id={item.id}
              title={item.title}
              key={item.id}
            />
          ))}
        </SortableContext>
      </div>
    </>
  );
};

export default TodoList;
