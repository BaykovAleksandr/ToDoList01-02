import { createSlice, nanoid } from "@reduxjs/toolkit";
import { createTodolistAC, deleteTodolistAC } from './todolists-slice';

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{
      todolistId: string;
      taskId: string;
    }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (todo) => todo.id === action.payload.taskId
      );
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>(
      (state, action) => {
        const newTask: Task = {
          title: action.payload.title,
          isDone: false,
          id: nanoid(),
        };

        state[action.payload.todolistId].unshift(newTask);
      }
    ),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (todo) => todo.id === action.payload.taskId
      );
      if (task) task.isDone = action.payload.isDone;
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (todo) => todo.id === action.payload.taskId
      );
      if (task) task.title = action.payload.title;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const {deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions

export const {} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

// export const deleteTaskAC = createAction<{
//   todolistId: string;
//   taskId: string;
// }>("tasks/delete_task");

// export const createTaskAC = createAction<{ todolistId: string; title: string }>(
//   "tasks/createTask"
// );

// export const changeTaskStatusAC = createAction<{
//   todolistId: string;
//   taskId: string;
//   isDone: boolean;
// }>("tasks/change_task_status");

// export const changeTaskTitleAC = createAction<{
//   todolistId: string;
//   taskId: string;
//   title: string;
// }>("tasks/change_task_title");

// const initialState: TasksState = {};

// export const tasksReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(deleteTodolistAC, (state, action) => {
//       delete state[action.payload.id];
//     })
//     .addCase(createTodolistAC, (state, action) => {
//       state[action.payload.id] = [];
//     })
//     .addCase(deleteTaskAC, (state, action) => {
//       const index = state[action.payload.todolistId].findIndex(
//         (todo) => todo.id === action.payload.taskId
//       );
//       if (index !== -1) state[action.payload.todolistId].splice(index, 1);
//     })
//     .addCase(createTaskAC, (state, action) => {
//       const newTask: Task = {
//         title: action.payload.title,
//         isDone: false,
//         id: nanoid(),
//       };

//       state[action.payload.todolistId].unshift(newTask);
//     })
//     .addCase(changeTaskStatusAC, (state, action) => {
//       const task = state[action.payload.todolistId].find(
//         (todo) => todo.id === action.payload.taskId
//       );
//       if (task) task.isDone = action.payload.isDone;
//     })
//     .addCase(changeTaskTitleAC, (state, action) => {
//       const task = state[action.payload.todolistId].find(
//         (todo) => todo.id === action.payload.taskId
//       );
//       if (task) task.title = action.payload.title;
//     });
// });
