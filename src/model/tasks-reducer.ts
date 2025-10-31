import { v1 } from "uuid";
import type { TasksState } from "../App";

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type deleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type Actions =
  | CreateTodolistAction
  | deleteTodolistAction
  | deleteTaskAction
  | createTaskAction
  | changeTaskStatusAction;

const initialState: TasksState = {};

export const tasksReducer = (
  state: TasksState = initialState,
  action: Actions
): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      return { ...state, [action.payload.id]: [] };
    }
    case "delete_todolist": {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case "delete_task": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.id
        ),
      };
    }

    case "create_task": {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.todolistId]: [
          newTask,
          ...state[action.payload.todolistId],
        ],
      };
    }

    case "change_task_status": {
      return {
      ...state,
      [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
        task.id == action.payload.id ? { ...task, isDone: action.payload.isDone } : task
      ),
    };
    }
    default:
      return state;
  };}

export const createTodolistAC = (title: string) => {
  return { type: "create_todolist", payload: { title, id: v1() } } as const;
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export const deleteTaskAC = (todolistId: string, id: string) => {
  return { type: "delete_task", payload: { todolistId, id } } as const;
};

export const createTaskAC = (todolistId: string, title: string) => {
  return {type: "create_task", payload: { todolistId, title} } as const
};

export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
  return {type: "change_task_status", payload: {todolistId, id, isDone}} as const
};