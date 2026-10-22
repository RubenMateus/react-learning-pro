import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Users } from "./pages/Users";
import { UserPage } from "./pages/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CreateUser } from "./pages/CreateUser";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { Todos } from "./pages/Todos";
import { Nav } from "./components/Nav";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Dashboard />}>
              <Route index element={<Users />} />
              <Route path="create" element={<CreateUser />} />
              <Route path=":id" element={<UserPage />} />
            </Route>
            <Route path="/todos" element={<Todos />} />
            <Route
              path="*"
              element={
                <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">
                    404
                  </p>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Page not found
                  </h1>
                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    The page you’re looking for doesn’t exist.
                  </p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
