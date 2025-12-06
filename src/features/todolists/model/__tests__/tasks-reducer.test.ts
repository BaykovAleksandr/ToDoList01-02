import { beforeEach, expect, test } from "vitest";

import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
  TasksState,
} from "../tasks-slice";
import { createTodolistTC, deleteTodolistTC } from '../todolists-slice';

let startState: TasksState = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
});

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskAC({ todolistId: "todolistId2", taskId: "2" })
  );

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    createTaskAC({
      todolistId: "todolistId2",
      title: "juice",
    })
  );

  expect(endState.todolistId1.length).toBe(3);
  expect(endState.todolistId2.length).toBe(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe("juice");
  expect(endState.todolistId2[0].isDone).toBe(false);
});

test("correct task should change its status", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      todolistId: "todolistId2",
      taskId: "2",
      isDone: false,
    })
  );

  expect(endState.todolistId2[1].isDone).toBe(false);
  expect(endState.todolistId1[1].isDone).toBe(true);
});

test("correct task should change its title", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      todolistId: "todolistId2",
      taskId: "2",
      title: "coffee",
    })
  );

  expect(endState.todolistId2[1].title).toBe("coffee");
  expect(endState.todolistId1[1].title).toBe("JS");
});

test("array should be created for new todolist", () => {
  const endState = tasksReducer(
    startState,
    // Используйте fulfilled action из thunk
    createTodolistTC.fulfilled(
      { id: "new-id", title: "New todolist", addedDate: "", order: 0 }, // То что возвращает thunk
      "", // requestId
      "New todolist" // аргумент (title)
    )
  );

  const keys = Object.keys(endState);
  expect(keys.length).toBe(3);
  expect(endState["new-id"]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    // Используйте fulfilled action из thunk
    deleteTodolistTC.fulfilled(
      "todolistId2", // То что возвращает thunk (id)
      "", // requestId
      { id: "todolistId2" } // аргумент
    )
  );

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
