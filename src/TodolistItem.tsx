import { ChangeEvent, type KeyboardEvent, useState } from "react";
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

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      createTaskHandler();
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title="close" onClick={deleteTaskHandler} />
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
