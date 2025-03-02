import { SIGNUP_MUTATION } from "@/GraphQL";
import { signupSchema } from "@/validations";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Container from "../Container";
import Input from "../ui/Input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type FormData = yup.InferType<typeof signupSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      reset();
      toast.success("Signup successful!");
      navigate("/login");
    },

    onError: (error) => {
      console.log(error, "Signup Error:");
      toast.error("Signup failed!");
    },
  });

  const onSubmit = (data: FormData) => {
    signup({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <Container>
      <div className="flex pt-24 gap-8 h-screen">
        <div className="w-1/2 overflow-hidden bg-yellow-50 h-full">
          <img
            src="https://images.unsplash.com/photo-1740680209886-c461a9c692f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-1/2 p-10 flex flex-col gap-5">
          <h1 className="text-8xl font-extrabold text-center mb-5">Sign Up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              error={errors.name?.message}
            />
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
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <button
              type="submit"
              className="w-full bg-neutral-50 p-3 rounded-lg text-neutral-900"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <a href="/login" className="text-neutral-200">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
