import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { TaskStatus } from "@/common/enums";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { DomainTask } from "@/features/todolists/api/tasksApi.types";
import { changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC } from "@/features/todolists/model/tasks-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import { getListItemSx } from "./TaskItem.style";

type Props = {
  task: DomainTask;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusTC({
        todolistId,
        taskId: task.id,
        status: newStatusValue ? TaskStatus.Completed : TaskStatus.New,
      }),
    );
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleTC({ todolistId, taskId: task.id, title }));
  };

  const isTaskCompleted = task.status === TaskStatus.Completed;

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
