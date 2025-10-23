import { ChangeEvent } from "react";
import type { FilterValues, Task, Todolist } from "./App";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

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
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle,
}: Props) => {
  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };

  return (
    <div>
      <div className={"container"}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <div>
        <CreateItemForm onCreateItem={createTaskHandler} />
      </div>
      {tasks.length < 1 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
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

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title);
            };
            return (
              <>
                <ListItem key={task.id} className={task.isDone ? "is-done" : ""}>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                  <IconButton onClick={deleteTaskHandler}>
                    <DeleteForeverTwoToneIcon />
                  </IconButton>
                </ListItem>
              </>
            );
          })}
        </List>
      )}

      <div>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          color={"inherit"}
          onClick={() => changeFilterHandler("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          color={"primary"}
          onClick={() => changeFilterHandler("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={() => changeFilterHandler("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
