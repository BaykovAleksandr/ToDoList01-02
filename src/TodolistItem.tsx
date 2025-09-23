import { useRef, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  filterTask: (task: FilterValues) => void;
  createTask: (title: string) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  filterTask,
  createTask,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");

  const createTaskHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
          value={taskTitle}
        />
        <Button title={"+"} onClick={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title="close" onClick={() => deleteTask(task.id)} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => filterTask("all")} />
        <Button title={"Active"} onClick={() => filterTask("active")} />
        <Button title={"Completed"} onClick={() => filterTask("completed")} />
      </div>
    </div>
  );
};
