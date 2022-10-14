import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { useRegister } from "./hooks/useRegister";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { registerSchema } from "./schemas/registerSchema";
import { isFileImageType } from "../../utils/validators";

import { LoginRegisterFormLayout } from "../../components/layouts/LoginRegisterFormLayout";
import { Button } from "../../components/ui/Button";
import { AlertInput } from "../../components/ui/AlertInput";
import { Spinner } from "../../components/ui/Spinner";
import { AlertSnackbar } from "../../components/ui/AlertSnackbar";
import { useLogin } from "../login/hooks/useLogin";
import { Input } from "../../components/ui/Input";

const Register = () => {
    const [avatarFile, setAvatarFile] = useState(undefined);
    const [avatarError, setAvatarError] = useState(undefined);
    const onDrop = useCallback(acceptedFiles => {
        const avatarFile = acceptedFiles[0];
        if (isFileImageType(avatarFile)) {
            setAvatarFile(avatarFile);
            setAvatarError(undefined);
            return;
        }
        setAvatarFile(undefined);
        setAvatarError("Accepts only png, jpeg and jpg file types.");
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    const { registerUser, isRegisterLoading, registrationError } =
        useRegister();
    const { loggedInUser, updateUser } = useLoggedInUser();
    const { login } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async data => {
        await registerUser({
            ...data,
            ...(avatarFile && { avatar: avatarFile })
        });
        const user = await login(data.email, data.password);
        updateUser(user);
    };

    if (loggedInUser) {
        return <Navigate replace to="/" />;
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
                    <label htmlFor="avatar" className="block">
                        Avatar
                    </label>
                    <div
                        {...getRootProps()}
                        className={`p-4 ${
                            avatarFile ? "" : "bg-white"
                        } mt-2 rounded cursor-pointer hover:opacity-60 text-center`}
                    >
                        <input {...getInputProps()} />
                        {avatarFile ? (
                            <img
                                src={URL.createObjectURL(avatarFile)}
                                alt="avatar"
                                className="w-32 rounded-full mx-auto"
                            />
                        ) : isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drop your avatar here!</p>
                        )}
                    </div>
                    {avatarError && <AlertInput message={avatarError} />}
                </div>
                <div className="mt-4">
                    <label htmlFor="firstName" className="block">
                        First Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="text"
                        id="firstName"
                        defaultValue=""
                        disabled={isRegisterLoading}
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <AlertInput message={errors.firstName.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="lastName" className="block">
                        Last Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="text"
                        id="lastName"
                        defaultValue=""
                        disabled={isRegisterLoading}
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <AlertInput message={errors.lastName.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block">
                        Email <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="email"
                        id="email"
                        defaultValue=""
                        disabled={isRegisterLoading}
                        {...register("email")}
                    />
                    {errors.email && (
                        <AlertInput message={errors.email.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block">
                        Password <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="password"
                        id="password"
                        defaultValue=""
                        disabled={isRegisterLoading}
                        {...register("password")}
                    />
                    {errors.password && (
                        <AlertInput message={errors.password.message} />
                    )}
                </div>
                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="block">
                        Confirm Password <span className="text-red-600">*</span>
                    </label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        defaultValue=""
                        disabled={isRegisterLoading}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <AlertInput message={errors.confirmPassword.message} />
                    )}
                </div>
                <div className="mt-6 text-center">
                    {isRegisterLoading ? (
                        <Spinner />
                    ) : (
                        <Button type="submit" text="Register" />
                    )}
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
