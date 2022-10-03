import { useState } from "react";
import axios from "axios";

const useLogin = () => {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(undefined);

    const login = async (email, password) => {
        setIsLoginLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/auth/login/`,
                {
                    email,
                    password
                }
            );
            return response.data
        } catch (error) {
            // console.log(error)
            setLoginError(error.response.data.detail)
        } finally {
            setIsLoginLoading(false);
        }
    };

    return { login, isLoginLoading, loginError };
};

export { useLogin };
