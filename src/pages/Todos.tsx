import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodoStore } from "@/store/useTodoStore";
import { Check, ListTodo, Plus, Trash2 } from "lucide-react";

export const Todos = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");
  const completedCount = todos.filter((todo) => todo.done).length;
  const remainingCount = todos.length - completedCount;

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = newTodo.trim();
    if (!text) return;
    addTodo(text);
    setNewTodo("");
  };

  const clearCompleted = () =>
    useTodoStore.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.done),
    }));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
            Your workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            Tasks, made manageable.
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Capture what’s on your mind and take it one step at a time.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{remainingCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">to do</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{completedCount}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">completed</p>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <form
          onSubmit={handleAddTodo}
          className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/70 p-4 sm:flex-row dark:border-slate-800 dark:bg-slate-950/60"
        >
          <label className="sr-only" htmlFor="new-todo">
            Add a task
          </label>
          <Input
            id="new-todo"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="What needs to get done?"
            className="h-11 bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <Button type="submit" className="h-11 shrink-0">
            <Plus aria-hidden="true" />
            Add task
          </Button>
        </form>

        {todos.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 px-4 py-4 transition hover:bg-slate-50 sm:px-5 dark:hover:bg-slate-800/60"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.done ? `Mark ${todo.text} as incomplete` : `Complete ${todo.text}`}
                  aria-pressed={todo.done}
                  className={`grid size-6 shrink-0 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    todo.done
                      ? "bg-emerald-600 text-white"
                      : "border-2 border-slate-300 text-transparent hover:border-blue-500 dark:border-slate-600"
                  }`}
                >
                  {todo.done && (
                    <Check aria-hidden="true" className="size-3.5" />
                  )}
                </button>
                <span
                  className={`min-w-0 flex-1 break-words text-sm ${
                    todo.done
                      ? "text-slate-400 line-through"
                      : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${todo.text}`}
                  className="text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  onClick={() => removeTodo(todo.id)}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-14 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <ListTodo aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-4 font-semibold text-slate-900 dark:text-slate-100">A fresh start</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Add your first task above and it’ll show up here.
            </p>
          </div>
        )}

        <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-slate-500 dark:text-slate-400">
            {todos.length} {todos.length === 1 ? "task" : "tasks"} · {completedCount}{" "}
            completed
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            disabled={completedCount === 0}
            className="w-fit text-slate-600 dark:text-slate-300"
          >
            Clear completed
          </Button>
        </footer>
      </section>
    </main>
  );
};
