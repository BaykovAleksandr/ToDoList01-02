import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "@/features/todolists/model/todolists-slice";
import styles from "./TodolistTitle.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC({ id }));
  };

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }));
  };

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
