import { setAppStatusAC } from "@/app/app-slice";
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils";
import { todolistsApi } from "../api/todolistsApi";
import { RequestStatus } from "@/common/types";
import { ResultCode } from "@/common/enums";
import { Todolist, todolistSchema } from "../lib/schemas";

export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};
export type FilterValues = "all" | "active" | "completed";
//export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state: DomainTodolist[]) => state,
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));

          const res = await todolistsApi.getTodolists();
          const validatedData = todolistSchema.array().safeParse(res.data);
          if (!validatedData.success) {
            console.error("Zod validation error for fetch todolists:", validatedData.error);
            return rejectWithValue(null);
          }
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolists: validatedData.data };
        } catch (error) {
          console.log(error);
          handleServerNetworkError(dispatch, error);
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all", entityStatus: "idle" });
          });
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));

          const res = await todolistsApi.createTodolist(title);
          if (res.data.resultCode === ResultCode.Success) {
            const validatedTodolist = todolistSchema.safeParse(res.data.data.item);
            if (!validatedTodolist.success) {
              console.error("Zod validation error for created todolist:", validatedTodolist.error);
              return rejectWithValue(null);
            }
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return validatedTodolist.data;
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
          const serverTodolist = action.payload;
          const newTodolist: DomainTodolist = {
            ...serverTodolist,
            filter: "all",
            entityStatus: "idle",
          };
          state.unshift(newTodolist);
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (payload: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          dispatch(changeTodolistStatusAC({ id: payload.id, entityStatus: "loading" }));
          const res = await todolistsApi.deleteTodolist(payload.id);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return payload.id;
          } else {
            dispatch(changeTodolistStatusAC({ id: payload.id, entityStatus: "idle" }));
            handleServerAppError(res.data, dispatch);

            return rejectWithValue(null);
          }
        } catch (error: any) {
          dispatch(changeTodolistStatusAC({ id: payload.id, entityStatus: "idle" }));
          handleServerNetworkError(error, dispatch);

          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todolist) => todolist.id === action.payload);
          if (index !== -1) {
            state.splice(index, 1);
          }
        },
      },
    ),

    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));

          const res = await todolistsApi.changeTodolistTitle(payload);
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }));
            return payload;
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
          const index = state.findIndex((todolist) => todolist.id === action.payload.id);
          if (index !== -1) {
            state[index].title = action.payload.title;
          }
        },
      },
    ),
    clearTodolistsData: create.reducer<DomainTodolist[]>((state: DomainTodolist[]) => {
      state.length = 0;
    }),
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    changeTodolistStatusAC: create.reducer<{
      id: string;
      entityStatus: RequestStatus;
    }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus;
      }
    }),
  }),
});

export const {
  fetchTodolistsTC,
  changeTodolistFilterAC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistStatusAC,
  clearTodolistsData
} = todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
