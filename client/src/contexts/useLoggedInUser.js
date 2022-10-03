import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import {
    LOCAL_STORAGE_TOKEN,
    LOCAL_STORAGE_REFRESH_TOKEN
} from "../constants/app";

const LoggedInUserContext = createContext();

const LoggedInUserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [serverError, setServerError] = useState(undefined);

    const updateUser = user => {
        setLoggedInUser(user);
    };

    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
        setIsLoading(true);
        setLoggedInUser(undefined);
        window.location.href = "/";
    };

    useEffect(() => {
        const initialiseUser = async () => {
            try {
                const response = await axiosInstance.get(
                    `${process.env.REACT_APP_API}/auth/`
                );
                updateUser(response);
            } catch (error) {
                const { code } = error;
                if (code === "ERR_BAD_RESPONSE") {
                    setServerError(
                        "An unexpected error occurred. Please try again."
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };
        initialiseUser();
    }, []);

    const value = {
        loggedInUser,
        updateUser,
        isLoading,
        serverError,
        logout
    };

    return (
        <LoggedInUserContext.Provider value={value}>
            {children}
        </LoggedInUserContext.Provider>
    );
};

const useLoggedInUser = () => {
    const context = useContext(LoggedInUserContext);
    if (context === undefined) {
        throw new Error(
            "useLoggedInUser must be used within a LoggedInUserProvider."
        );
    }
    return context;
};

export { LoggedInUserProvider, useLoggedInUser };
