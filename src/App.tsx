import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const deleteTask = (itemId: string) =>
    setTasks(tasks.filter((item) => item.id !== itemId));

   function getFilteredTasks() {
     let tasksForTodolist = tasks;

     switch (filter) {
       case "active":
         tasksForTodolist = tasks.filter((t) => t.isDone === false);
         break;

       case "completed":
         tasksForTodolist = tasks.filter((t) => t.isDone === false);
         break;
     }

     return tasksForTodolist;
   }

  const filterTask = (item: FilterValues) => {
    return setFilter(item);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map((task) =>
      task.id == taskId ? { ...task, isDone } : task
    );
    setTasks(newState);
  };

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={getFilteredTasks()}
        deleteTask={deleteTask}
        filterTask={filterTask}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
};
