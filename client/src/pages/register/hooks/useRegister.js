import { useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";

const useRegister = () => {
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState(undefined);

    const registerUser = async data => {
        setIsRegisterLoading(true);
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.set(key, value)
            })
            await axiosInstance.post(
                `${process.env.REACT_APP_API}/users/`,
                formData
            );
        } catch (error) {
            // TODO: can API return better errors?
            console.log(error);
            console.log(Object.values(error).join("\n"));
            setRegistrationError(Object.values(error).join("\n"));
            // setRegistrationError(error.detail);
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return { registerUser, isRegisterLoading, registrationError };
};

export { useRegister };
