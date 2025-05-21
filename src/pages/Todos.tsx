import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/useTodoStore";
import { Trash2 } from "lucide-react";

export const Todos = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  return (
    <div className="p-4">
      <h1>Todos</h1>
      <p className="mb-4">
        {todos.length} total, {todos.filter((todo) => todo.done).length}{" "}
        completed
      </p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              className="mr-2"
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <p className={`inline ${todo.done ? "line-through" : ""}`}>
              {todo.text}
            </p>
            <Button
              className="ml-2 cursor-pointer"
              variant="destructive"
              onClick={() => removeTodo(todo.id)}
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        className="mt-4 cursor-pointer"
        onClick={() => addTodo(prompt("Enter todo text") || "")}
      >
        Add Todo
      </Button>
      <Button
        className="mt-4 ml-4 cursor-pointer"
        variant="outline"
        onClick={() =>
          useTodoStore.setState((state) => ({
            todos: state.todos.filter((todo) => !todo.done),
          }))
        }
      >
        Clear Completed
      </Button>
    </div>
  );
};
