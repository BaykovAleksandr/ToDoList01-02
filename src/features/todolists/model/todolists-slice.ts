import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todolistsApi } from "../api/todolistsApi";
import { Todolist } from "../api/todolistsApi.types";

export type DomainTodolist = Todolist & {
  filter: FilterValues;
};
export type FilterValues = "all" | "active" | "completed";
export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: "all" };
        });
      })
      .addCase(fetchTodolistsTC.rejected, (state, action) => {
        // обработка ошибки при запросе за тудулистами
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const serverTodolist = action.payload;
        const newTodolist: DomainTodolist = {
          ...serverTodolist,
          filter: "all",
        };
        state.push(newTodolist);
      });
  },
});

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload);
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(payload.id);
      return payload.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title);
      return res.data.data.item;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const { changeTodolistFilterAC } = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
