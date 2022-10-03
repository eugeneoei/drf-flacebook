import { useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const useLogin = () => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(undefined);

    const login = async (email, password) => {
        setIsLoginLoading(true);
        try {
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_API}/auth/login/`,
                {
                    email,
                    password
                }
            );
            const { access, refresh, user } = response;
            localStorage.setItem("token", access);
            localStorage.setItem("refresh", refresh);
            return user;
        } catch (error) {
            setLoginError(error.detail);
        } finally {
            setIsLoginLoading(false);
        }
    };

    return { login, isLoginLoading, loginError };
};

export { useLogin };
