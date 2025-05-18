import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Users } from "./pages/Users";
import { User } from "./pages/User";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Dashboard />}>
          <Route index element={<Users />} />
          <Route path=":id" element={<User />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
