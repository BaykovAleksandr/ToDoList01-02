import { createSlice, nanoid } from "@reduxjs/toolkit";
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice";
import { RootState } from "@/app/store";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;
export const selectTasks = (state: RootState): TasksState => state.tasks;
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{
      todolistId: string;
      taskId: string;
    }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((todo) => todo.id === action.payload.taskId);
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: Task = {
        title: action.payload.title,
        isDone: false,
        id: nanoid(),
      };

      state[action.payload.todolistId].unshift(newTask);
    }),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((todo) => todo.id === action.payload.taskId);
      if (task) task.isDone = action.payload.isDone;
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find((todo) => todo.id === action.payload.taskId);
      if (task) task.title = action.payload.title;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = [];
      })

      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload];
      });
  },
});

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions;

export const {} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
