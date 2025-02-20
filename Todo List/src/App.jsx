import React, { useState } from "react";
import "./style.scss";
import TodoList from "./Components/TodoList";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import InputBox from "./Components/InputBox";

const App = () => {
  const [task, setTask] = useState([
    { id: 1, title: "Complete The Weather App" },
    { id: 2, title: "Complete The Drag & Drop List" },
    { id: 3, title: "Complete The Pagination" },
  ]);

  const addTask = (title) => {
    setTask((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const getTaskPosition = (id) => task.findIndex((task) => task.id === id);

  const handleDrangEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTask((task) => {
      const orginalPos = getTaskPosition(active.id);
      const newPos = getTaskPosition(over.id);

      return arrayMove(task, newPos, orginalPos);
    });
  };
  return (
    <>
      <div className="main">
        <h1>TODO LIST</h1>
        <InputBox onSubmit={addTask} />
        <h2 className="heading">My Tasks</h2>

        <DndContext
          onDragEnd={handleDrangEnd}
          collisionDetection={closestCorners}
        >
          <TodoList task={task} />
        </DndContext>
      </div>
    </>
  );
};

export default App;
