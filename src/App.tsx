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
import { Dropdowns } from "./pages/Dropdowns";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Dashboard />}>
              <Route index element={<Users />} />
              <Route path="create" element={<CreateUser />} />
              <Route path=":id" element={<UserPage />} />
            </Route>
            <Route path="/todos" element={<Todos />} />
            <Route path="/dropdowns-malucas" element={<Dropdowns />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
