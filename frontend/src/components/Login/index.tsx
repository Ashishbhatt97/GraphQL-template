import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations";
import Input from "../ui/Input";
import Container from "../Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/GraphQL";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setTokens } from "@/store/reducers/authReducers";

type FormData = yup.InferType<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const [login, { data, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      reset();
      navigate("/");
      toast.success("Login successful!");
      localStorage.setItem("access_token", data.login.accessToken);
      localStorage.setItem("refresh_token", data.login.refreshToken);
      dispatch(
        setTokens({
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        })
      );
    },

    onError: (error) => {
      toast.error("Login failed!");
      console.error("Login Error:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    login({ variables: { email: data.email, password: data.password } });
  };

  console.log(data);

  return (
    <Container>
      <div className="flex pt-24 gap-8 h-screen items-center">
        <div className="w-1/2 overflow-hidden bg-yellow-50 h-full">
          <img
            src="https://images.unsplash.com/photo-1740680209886-c461a9c692f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-1/2 p-10 flex flex-col gap-5">
          <h1 className="text-8xl font-extrabold text-center mb-5">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold bg-neutral-50 p-3 rounded-lg text-neutral-900"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center">
              Don&apos;t have an account?{" "}
              <NavLink to="/signup" className="text-neutral-200">
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
