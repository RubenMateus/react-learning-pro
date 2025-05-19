import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";

export const Dashboard = () => {
  return (
    <div>
      <Nav />
      {/* <h1>Dashboard</h1> */}
      <Outlet />
    </div>
  );
};
