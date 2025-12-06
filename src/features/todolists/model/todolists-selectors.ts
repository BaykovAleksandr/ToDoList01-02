import { RootState } from "@/app/store";
import { DomainTodolist } from './todolists-slice';


export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists;
