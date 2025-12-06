import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTodolistTC } from "@/features/todolists/model/todolists-slice";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import { Container, Grid } from "@mui/material";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};
