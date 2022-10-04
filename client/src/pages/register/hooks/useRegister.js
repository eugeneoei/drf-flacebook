import { useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const navigate = useNavigate();

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState(undefined);

    const registerUser = async ({ firstName, lastName, email, password }) => {
        setIsRegisterLoading(true);
        try {
            await axiosInstance.post(`${process.env.REACT_APP_API}/users/`, {
                firstName,
                lastName,
                email,
                password
            });
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
            console.log(Object.values(error).join("\n"))
            setRegistrationError(Object.values(error).join("\n"));
            // setRegistrationError(error.detail);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return { registerUser, isRegisterLoading, registrationError };
};

export { useRegister };
