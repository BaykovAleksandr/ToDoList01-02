import { RootState } from "@/app/store";
import { Todolist } from "./todolists-slice";

export const selectTodolists = (state: RootState): Todolist[] =>
  state.todolists;
