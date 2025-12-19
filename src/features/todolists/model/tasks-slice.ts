import { RootState } from "@/app/store";
import { ResultCode, TaskStatus } from "@/common/enums";
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types";
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice";
import { setAppStatusAC } from "@/app/app-slice";

export type TasksState = Record<string, DomainTask[]>;
export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state: TasksState) => state,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.getTasks(todolistId);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolistId, tasks: res.data.items };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.createTask(payload);

          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          await tasksApi.deleteTask(payload);
          thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
          return payload;
        } catch (error) {
          thunkAPI.dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex((task) => task.id === action.payload.taskId);
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      },
    ),

    changeTaskStatusTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
        const { todolistId, taskId, status } = payload;

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return thunkAPI.rejectWithValue(null);
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status,
        };

        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id);
          if (task) {
            task.status = action.payload.task.status;
          }
        },
      },
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string; title: string }, thunkAPI) => {
        const { todolistId, taskId, title } = payload;

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return thunkAPI.rejectWithValue(null);
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: task.status,
        };

        try {
          thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (error: any) {
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id);
          if (task) {
            task.title = action.payload.task.title;
          }
        },
      },
    ),
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

export const { fetchTasksTC, deleteTaskTC, createTaskTC, changeTaskStatusTC, changeTaskTitleTC } = tasksSlice.actions;
export const { selectTasks } = tasksSlice.selectors;

export const tasksReducer = tasksSlice.reducer;
