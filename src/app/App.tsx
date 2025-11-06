import { useState } from "react";
import "./App.css";
import { TodolistItem } from "../TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "../CreateItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { containerSx } from "../TodolistItem.styles";
import { NavButton } from "../NavButton";
import CssBaseline from "@mui/material/CssBaseline";
import { MaterialUISwitch } from "../Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "../model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
} from "../model/tasks-reducer";
import { RootState } from "./store";

type ThemeMode = "dark" | "light";

export const todolistId1 = v1();
export const todolistId2 = v1();

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;

export type Tasks = {
  [todolistId: string]: Task[];
};

export type FilterValues = "all" | "active" | "completed";
export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export const App = () => {
  const todolists = useSelector<RootState, Todolist[]>(
    (state) => state.todolists
  );
  const tasks = useSelector<RootState, TasksState>((state) => state.tasks);

  const dispatch = useDispatch();
  // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
  //   { id: todolistId1, title: "What to learn", filter: "all" },
  //   { id: todolistId2, title: "What to buy", filter: "all" },
  // ]);
  // const [tasks, dispatchTasks] = useReducer(tasksReducer, {
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title));
  };

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId));
  };
  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC(todolistId, title));
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC(todolistId, taskId));
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC(todolistId, filter));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
  };

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <MaterialUISwitch color={"default"} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth={"lg"}>
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists?.map((todolist) => {
              const todolistTasks = tasks[todolist.id];
              let filteredTasks = todolistTasks;
              if (todolist.filter === "active") {
                filteredTasks = todolistTasks.filter((task) => !task.isDone);
              }
              if (todolist.filter === "completed") {
                filteredTasks = todolistTasks.filter((task) => task.isDone);
              }

              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: "0 20px 20px 20px" }}>
                    <TodolistItem
                      key={todolist.id}
                      todolist={todolist}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};
