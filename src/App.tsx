import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Início</NavLink>
          </li>
          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contacto</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
