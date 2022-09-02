import TodoStore from "./TodoStore";

let todos = TodoStore();

describe("TodoList", () => {
  beforeEach(() => {
    todos = TodoStore();
  });

  it("adds todos", () => {
    todos.add("My todo");

    expect(todos.list.length).toBe(1);
    expect(todos.list.find((t) => t.title === "My todo")).toBeDefined();
  });

  it("removes a todo", () => {
    todos.add("Test");

    todos.remove(todos.list[0]);
    expect(todos.list.length).toBe(0);
  });

  it("toggles a todo", () => {
    todos.add("Test");

    todos.toggle(todos.list[0]);
    expect(todos.list[0].isDone).toBe(true);
    expect(todos.unfinishedTodos.length).toBe(0);
  });

  it("unfinished todos", () => {
    todos.add("Test");

    expect(todos.unfinishedTodos.length).toBe(1);
  });

  it("cannot add empty todo", () => {
    todos.add("");

    expect(todos.list.length).toBe(0);
  });

  it("cannot add a todo with less than 3 characters", () => {
    todos.add("12");

    expect(todos.list.length).toBe(0);
  });

  it("cannot add a todo with at least 3 characters", () => {
    todos.add("123");

    expect(todos.list.length).toBe(1);
  });
});
