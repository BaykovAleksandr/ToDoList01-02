import { useAppSelector } from '@/common/hooks/useAppSelector';
import { Grid, Paper } from "@mui/material";
import { selectTodolists } from '../../model/todolists-selectors';
import { TodolistItem } from './TodolistItem/TodolistItem';


export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

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
