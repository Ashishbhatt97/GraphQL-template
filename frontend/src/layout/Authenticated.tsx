import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ME_QUERY } from "@/GraphQL";
import { resetToken } from "@/store/reducers/authReducers";
import { setUser } from "@/store/reducers/userReducer";
import { useAppSelector } from "@/store/store";
import { useQuery } from "@apollo/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Authenticated: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useQuery(ME_QUERY);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(resetToken());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  React.useEffect(() => {
    if (!loading && data) {
      dispatch(setUser(data.me));
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, data, loading]);

  return (
    <>
      <nav className="fixed z-50 text-neutral-50 h-18 w-full backdrop-blur-xl">
        <div className="mx-auto flex justify-between items-center h-full max-w-7xl">
          <button
            onClick={() => navigate("/")}
            className="text-2xl cursor-pointer font-bold"
          >
            Logo
          </button>

          <div className="h-14 w-1/2 flex items-center  gap-3 justify-evenly border border-neutral-500/50 rounded-full">
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-violet-600" : "text-white"}`
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <a href="#features">Features</a>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-violet-600" : "text-white"}`
              }
              to="/contact"
            >
              Contact
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-violet-600" : "text-white"}`
              }
              to="/pricing"
            >
              Pricing
            </NavLink>
          </div>

          <div className="flex gap-5 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none h-10 w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem className="text-red-800">
                  <button
                    onClick={logoutHandler}
                    className="flex group items-center justify-center "
                  >
                    <LogOut className="mr-2 text-red-800 " />
                    <h3 className="text-red-800 ">logout</h3>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Authenticated;
