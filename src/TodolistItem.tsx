import { ChangeEvent, useState } from "react";
import type { FilterValues, Task, Todolist } from "./App";
import { Button } from "./Button";
import { CreateItemForm } from "./CreateItemForm";

type Props = {
  tasks: Task[];
  todolist: Todolist;
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  deleteTodolist: (todolistId: string) => void;
};

export const TodolistItem = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodolist,
}: Props) => {
  const [error, setError] = useState<string | null>(null);

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  return (
    <div>
      <div className={"container"}>
        <h3>{title}</h3>
        <Button title={"x"} onClick={deleteTodolistHandler} />
      </div>
      <div>
  
        <CreateItemForm onCreateItem={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length < 1 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id);
            };
            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(id, task.id, newStatusValue);
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
