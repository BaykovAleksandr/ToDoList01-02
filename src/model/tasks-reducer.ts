import { v1 } from 'uuid';
import type { TasksState } from "../App";



export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type deleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type Actions = CreateTodolistAction | deleteTodolistAction;

const initialState: TasksState = {};

export const tasksReducer = (
  state: TasksState = initialState,
  action: Actions
): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      return { ...state, [action.payload.id]: [] };
    }
    case "delete_todolist" : {
     const newState = { ...state };
     delete newState[action.payload.id];
     return newState;
    }
    default:
      return state;
  }
};



export const createTodolistAC = (title: string) => {
  return { type: "create_todolist", payload: { title, id: v1() } } as const;
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
}
