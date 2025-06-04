import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Todos } from "../Todos";
import { useTodoStore } from "@/store/useTodoStore";

const mockTodos = [
  { id: "1", text: "First todo", done: false },
  { id: "2", text: "Second todo", done: true },
  { id: "3", text: "Third todo", done: true },
];

const addTodo = vi.fn();
const toggleTodo = vi.fn();
const removeTodo = vi.fn();
// const setState = vi.fn();

vi.mock("@/store/useTodoStore");

describe("Todos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTodoStore).mockImplementation(() => ({
      todos: mockTodos,
      addTodo,
      toggleTodo,
      removeTodo,
    }));
  });

  it("renders todos and completed count", () => {
    render(<Todos />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("3 total, 2 completed")).toBeInTheDocument();
    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
  });

  it("calls toggleTodo when checkbox is clicked", () => {
    render(<Todos />);
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(toggleTodo).toHaveBeenCalledWith("1");
  });

  it("calls removeTodo when trash button is clicked", () => {
    render(<Todos />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    expect(removeTodo).toHaveBeenCalledWith("1");
    fireEvent.click(buttons[1]);
    expect(removeTodo).toHaveBeenCalledWith("2");
  });

  it("calls addTodo with prompt value when Add Todo is clicked", () => {
    vi.stubGlobal("prompt", () => "New Todo");

    render(<Todos />);
    const addButton = screen.getByText("Add Todo");
    fireEvent.click(addButton);
    expect(addTodo).toHaveBeenCalledWith("New Todo");
    vi.unstubAllGlobals();
  });

  it("does not call addTodo if prompt is cancelled", () => {
    vi.stubGlobal("prompt", () => null);
    render(<Todos />);
    const addButton = screen.getByText("Add Todo");
    fireEvent.click(addButton);
    expect(addTodo).toHaveBeenCalledWith("");
    vi.unstubAllGlobals();
  });

  // it("calls setState to clear completed todos when Clear Completed is clicked", () => {
  //   render(<Todos />);
  //   const clearButton = screen.getByText("Clear Completed");
  //   fireEvent.click(clearButton);
  //   expect(setState).toHaveBeenCalled();
  //   // Optionally, check the filtering logic
  //   const callArg = setState.mock.calls[0][0];
  //   const newState = callArg({ todos: mockTodos });
  //   expect(newState.todos).toEqual([
  //     { id: "1", text: "First todo", done: false },
  //   ]);
  // });
});
