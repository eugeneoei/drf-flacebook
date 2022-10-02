import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const navigate = useNavigate();

    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState(undefined);

    const registerUser = async ({
        firstName,
        lastName,
        email,
        password
    }) => {
        setIsRegisterLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API}/users/`, {
                firstName,
                lastName,
                email,
                password
            });
            navigate("/login", { replace: true });
        } catch (error) {
            setRegistrationError(error.response.data);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return { registerUser, isRegisterLoading, registrationError };
};

export { useRegister };
