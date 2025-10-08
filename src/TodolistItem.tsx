import { ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task, Todolist } from "./App";
import { Button } from "./Button";

type Props = {
  tasks: Task[];
  todolist: Todolist;
  deleteTask: (taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodolistItem = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      createTask(trimmedTitle);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      createTaskHandler();
    }
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };
            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue);
            };
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title="close" onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
