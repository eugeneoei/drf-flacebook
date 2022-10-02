import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";

import { useRegister } from "./hooks/useRegister";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { registerSchema } from "../../schemas/registerSchema";

import { LoginRegisterFormLayout } from "../../components/layouts/LoginRegisterFormLayout";
import { Button } from "../../components/ui/Button";
import { AlertInput } from "../../components/ui/AlertInput";
import { Spinner } from "../../components/ui/Spinner";
import { AlertSnackbar } from "../../components/ui/AlertSnackbar";

const Register = () => {

    const { registerUser, isRegisterLoading, registrationError } = useRegister();
    const { loggedInUser } = useLoggedInUser();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async data => {
        // todo: log user in programatically after registration is successful
        await registerUser(data)
        // navigate("/login", { replace: true });
        console.log("registering in >>", data)
    };

    if (loggedInUser) {
        return <Navigate replace to="/login" />;
    }

    return (
        <LoginRegisterFormLayout>
            <h3 className="text-xl text-center font-bold tracking-wider">
                Register
            </h3>
            {registrationError && !isRegisterLoading && (
                <AlertSnackbar message={registrationError} />
            )}
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mt-4">
                    <label htmlFor="firstName" className="block">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        defaultValue=""
                        {...register("firstName")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.firstName && (
                        <AlertInput message={errors.firstName.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="lastName" className="block">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        defaultValue=""
                        {...register("lastName")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.lastName && (
                        <AlertInput message={errors.lastName.message} />
                    )}
                </div>
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
                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="block">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        defaultValue=""
                        {...register("confirmPassword")}
                        className="block w-full mt-2 p-2 rounded"
                    />
                    {errors.confirmPassword && (
                        <AlertInput message={errors.confirmPassword.message} />
                    )}
                </div>
                <div className="mt-6">
                    {isRegisterLoading ? <Spinner /> : <Button text="Register" />}
                </div>
                <div className="mt-6 text-center">
                    Already have an account? Click{" "}
                    <Link to="/login" className="underline hover:opacity-40">
                        here
                    </Link>{" "}
                    to register an account.
                </div>
            </form>
        </LoginRegisterFormLayout>
    );
};

export { Register };
