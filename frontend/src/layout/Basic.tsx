import { useAppDispatch } from "@/store/store";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Basic: React.FC = () => {
  const isAuthenticated = useAppDispatch((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <nav className="bg-neutral-950 fixed text-neutral-50 font-medium h-18 w-full">
        <div className="mx-auto flex justify-between items-center h-full max-w-7xl">
          <h1 className="text-2xl font-bold">Logo</h1>
          <div className="flex gap-4">
            <NavLink
              className="bg-neutral-300 text-neutral-800 px-8 py-2 rounded-md"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="bg-neutral-800 text-neutral-50 px-8 py-2 rounded-md"
              to="/signup"
            >
              Signup
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Basic;
