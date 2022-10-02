import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../schemas/loginSchema";
import { AlertInput } from "../../components/ui/AlertInput";
import { useLogin } from "./hooks/useLogin";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { AlertSnackbar } from "../../components/ui/AlertSnackbar";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";
import { LoginRegisterFormLayout } from "../../components/layouts/LoginRegisterFormLayout";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const { login, isLoginLoading, loginError } = useLogin();
    const { loggedInUser, updateUser } = useLoggedInUser();

    const handleLogin = async data => {
        console.log("loggin in >>", data)
        const user = await login(data.email, data.password);
        // updateUser(user);
    };

    if (loggedInUser) {
        return <Navigate replace to="/" />;
    }

    return (
        <LoginRegisterFormLayout>
            <h3 className="text-xl text-center font-bold tracking-wider">
                Login
            </h3>
            {loginError && !isLoginLoading && (
                <AlertSnackbar message={loginError} />
            )}
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        defaultValue=""
                        {...register("email")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.email && (
                        <AlertInput message={errors.email.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        defaultValue=""
                        {...register("password")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.password && (
                        <AlertInput message={errors.password.message} />
                    )}
                </div>
                <div className="mt-6">
                    {isLoginLoading ? <Spinner /> : <Button text="Login" />}
                </div>
                <div className="mt-6 text-center">
                    Already have an account? Click{" "}
                    <Link to="/register" className="underline hover:opacity-40">
                        here
                    </Link>{" "}
                    to register an account.
                </div>
            </form>
        </LoginRegisterFormLayout>
    );
};

export { Login };
