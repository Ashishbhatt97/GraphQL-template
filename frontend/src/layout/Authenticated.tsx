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
import { LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Authenticated: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useQuery(ME_QUERY);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { name } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(resetToken());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  React.useEffect(() => {
    if (data) {
      dispatch(setUser(data.me));
      console.log(data.me);
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, data]);

  return (
    <>
      <nav className="bg-neutral-950 fixed text-neutral-50 font-medium h-18 w-full">
        <div className="mx-auto flex justify-between items-center h-full max-w-7xl">
          <h1 className="text-2xl font-bold">Logo</h1>
          <div className="flex gap-5 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                {data && (
                  <div className="h-10 w-10 text-xl rounded-full outline flex items-center justify-center">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
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
