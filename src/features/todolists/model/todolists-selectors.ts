import { RootState } from "@/app/store";
import { Todolist } from '../api/todolistsApi.types';


export const selectTodolists = (state: RootState): Todolist[] =>
  state.todolists;
