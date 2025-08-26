import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Início</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/users">Utilizadores</NavLink>
        </li>
        <li>
          <NavLink to="/todos">Tarefas</NavLink>
        </li>
        <li>
          <NavLink to="/dropdowns-malucas">Dropdowns Malucas</NavLink>
        </li>
      </ul>
    </nav>
  );
};
