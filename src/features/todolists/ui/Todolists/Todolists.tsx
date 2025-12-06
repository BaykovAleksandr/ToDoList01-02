import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { selectTodolists } from "../../model/todolists-selectors";
import { fetchTodolistsTC } from '../../model/todolists-slice';
import { TodolistItem } from "./TodolistItem/TodolistItem";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
