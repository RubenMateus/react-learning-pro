import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTodoStore } from "./useTodoStore";

// Helper to reset the store between tests
const resetStore = () => {
  useTodoStore.setState({ todos: [] });
};

describe("useTodoStore", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    resetStore();
  });

  it("should initialize with empty todos", () => {
    expect(useTodoStore.getState().todos).toEqual([]);
  });

  it("should add a todo", () => {
    // Mock Date.now for predictable id
    const now = 12345;
    vi.spyOn(Date, "now").mockReturnValue(now);

    useTodoStore.getState().addTodo("Test todo");
    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual({ id: now, text: "Test todo", done: false });
  });

  it("should not add a todo with empty text", () => {
    useTodoStore.getState().addTodo("");
    expect(useTodoStore.getState().todos).toHaveLength(0);
  });

  it("should toggle a todo's done status", () => {
    const now = 1;
    vi.spyOn(Date, "now").mockReturnValue(now);

    useTodoStore.getState().addTodo("Toggle me");
    expect(useTodoStore.getState().todos[0].done).toBe(false);

    useTodoStore.getState().toggleTodo(now);
    expect(useTodoStore.getState().todos[0].done).toBe(true);

    useTodoStore.getState().toggleTodo(now);
    expect(useTodoStore.getState().todos[0].done).toBe(false);
  });

  it("should remove a todo", () => {
    const now = 42;
    vi.spyOn(Date, "now").mockReturnValue(now);

    useTodoStore.getState().addTodo("Remove me");
    expect(useTodoStore.getState().todos).toHaveLength(1);

    useTodoStore.getState().removeTodo(now);
    expect(useTodoStore.getState().todos).toHaveLength(0);
  });

  it("should not toggle or remove non-existent todo", () => {
    // Should not throw or change state
    useTodoStore.getState().toggleTodo(999);
    useTodoStore.getState().removeTodo(999);
    expect(useTodoStore.getState().todos).toEqual([]);
  });
});
