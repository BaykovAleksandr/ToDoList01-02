import { RootState } from "@/app/store";
import { TasksState } from "./tasks-slice";

export const selectTasks = (state: RootState): TasksState => state.tasks;
