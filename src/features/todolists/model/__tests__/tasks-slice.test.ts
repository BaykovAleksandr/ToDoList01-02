import { beforeEach, expect, test } from "vitest";
import { tasksReducer, TasksState } from "../tasks-slice";
import { TaskPriority, TaskStatus } from "@/common/enums";
import { setAppStatusAC } from "@/app/app-slice";

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
};

let startState: TasksState = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  };
});

test("correct task should be deleted", () => {
  const action = {
    type: "tasks/deleteTaskTC/fulfilled",
    payload: { todolistId: "todolistId2", taskId: "2" },
  };

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2).toHaveLength(2);
  expect(endState.todolistId2.find((t) => t.id === "2")).toBeUndefined();
  expect(endState.todolistId2.map((t) => t.id)).toEqual(["1", "3"]);
});

test("correct task should be created at correct array", () => {
  const newTask = {
    id: "4",
    title: "juice",
    status: TaskStatus.New,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  };

  const action = {
    type: "tasks/createTaskTC/fulfilled",
    payload: { task: newTask },
  };

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1).toHaveLength(3);
  expect(endState.todolistId2).toHaveLength(4);
  expect(endState.todolistId2[0].id).toBe("4");
  expect(endState.todolistId2[0].title).toBe("juice");
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New);
});

test("correct task should change its status", () => {
  const updatedTask = {
    id: "2",
    title: "milk",
    status: TaskStatus.New,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  };

  const action = {
    type: "tasks/changeTaskStatusTC/fulfilled",
    payload: { task: updatedTask },
  };

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New);
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed);
});

test("correct task should change its title", () => {
  const updatedTask = {
    id: "2",
    title: "coffee",
    status: TaskStatus.Completed,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  };

  const action = {
    type: "tasks/changeTaskTitleTC/fulfilled",
    payload: { task: updatedTask },
  };

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].title).toBe("coffee");
  expect(endState.todolistId1[1].title).toBe("JS");
});

test("array should be created for new todolist", () => {
  const action = {
    type: "todolists/createTodolistTC/fulfilled",
    payload: {
      id: "new-id",
      title: "New todolist",
      addedDate: "",
      order: 0,
    },
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys).toHaveLength(3);
  expect(endState["new-id"]).toEqual([]);
  expect(endState["new-id"]).toBeInstanceOf(Array);
});

test("property with todolistId should be deleted", () => {
  const action = {
    type: "todolists/deleteTodolistTC/fulfilled",
    payload: "todolistId2",
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys).toHaveLength(1);
  expect(keys).toEqual(["todolistId1"]);
  expect(endState["todolistId2"]).toBeUndefined();
});

test("tasks should be fetched for todolist", () => {
  const fetchedTasks = [
    {
      id: "10",
      title: "Task 1",
      status: TaskStatus.New,
      todoListId: "todolistId1",
      ...taskDefaultValues,
    },
    {
      id: "20",
      title: "Task 2",
      status: TaskStatus.Completed,
      todoListId: "todolistId1",
      ...taskDefaultValues,
    },
  ];

  const action = {
    type: "tasks/fetchTasksTC/fulfilled",
    payload: {
      todolistId: "todolistId1",
      tasks: fetchedTasks,
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1).toHaveLength(2);
  expect(endState.todolistId1).toEqual(fetchedTasks);
  expect(endState.todolistId2).toHaveLength(3);
});

test("reducer should not change state on pending action", () => {
  const action = {
    type: "tasks/deleteTaskTC/pending",
    payload: { todolistId: "todolistId2", taskId: "2" },
  };

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual(startState);
});

test("reducer should not change state on rejected action", () => {
  const action = {
    type: "tasks/deleteTaskTC/rejected",
    payload: { todolistId: "todolistId2", taskId: "2" },
    error: { message: "Error" },
  };

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual(startState);
});

test("should handle setAppStatusAC (no effect on tasks state)", () => {
  const action = setAppStatusAC({ status: "loading" });

  const endState = tasksReducer(startState, action);

  // setAppStatusAC не должен влиять на tasks state
  expect(endState).toEqual(startState);
});
