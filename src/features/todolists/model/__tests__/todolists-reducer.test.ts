import { nanoid } from "@reduxjs/toolkit";
import { beforeEach, expect, test } from "vitest";
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  DomainTodolist,
  todolistsReducer,
} from "../todolists-slice";

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
  todolistId1 = nanoid();
  todolistId2 = nanoid();

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "", // <-- добавляем обязательные поля
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "", // <-- добавляем обязательные поля
      order: 0,
    },
  ];
});

test("correct todolist should be deleted", () => {
  const action = deleteTodolistTC.fulfilled(
    todolistId1, // payload
    "", // requestId
    { id: todolistId1 }, // arg (аргумент вызова thunk)
  );

  const endState = todolistsReducer(startState, action);
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be created", () => {
  const title = "New todolist";
  const newTodolist: DomainTodolist = {
    id: "new-id",
    title,
    filter: "all",
    addedDate: "",
    order: 0,
  };

  const action = createTodolistTC.fulfilled(
    newTodolist, // payload (то что возвращает thunk)
    "", // requestId
    title, // arg (аргумент вызова thunk - title)
  );

  const endState = todolistsReducer(startState, action);
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});
test("correct todolist should change its title via thunk", () => {
  const title = "New title";
  const action = {
    type: changeTodolistTitleTC.fulfilled.type,
    payload: { id: todolistId2, title },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(title);
});

test("correct todolist should change its filter", () => {
  const filter = "completed";
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(filter);
});
