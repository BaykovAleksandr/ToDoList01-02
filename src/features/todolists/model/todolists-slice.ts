import { setAppStatusAC } from "@/app/app-slice";
import { createAppSlice } from "@/common/utils";
import { todolistsApi } from "../api/todolistsApi";
import { Todolist } from "../api/todolistsApi.types";

export type DomainTodolist = Todolist & {
  filter: FilterValues;
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
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolists: res.data };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" });
          });
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));

          const res = await todolistsApi.createTodolist(title);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return res.data.data.item;
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const serverTodolist = action.payload;
          const newTodolist: DomainTodolist = {
            ...serverTodolist,
            filter: "all",
          };
          state.unshift(newTodolist);
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (payload: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));

          await todolistsApi.deleteTodolist(payload.id);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return payload.id;
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
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

          await todolistsApi.changeTodolistTitle(payload);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return payload;
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
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
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
  }),
});

export const { fetchTodolistsTC, changeTodolistFilterAC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
  todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;

export const todolistsReducer = todolistsSlice.reducer;
