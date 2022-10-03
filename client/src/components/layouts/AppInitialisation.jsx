import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { Spinner } from "../ui/Spinner";

const AppInitialisation = ({ children }) => {
    const { isLoading, serverError } = useLoggedInUser();

    if (isLoading) {
        return (
            <div className="text-center mt-4">
                <Spinner />
            </div>
        );
    }

    if (serverError) {
        return (
            <div className="p-6 mt-4 text-center">
                <FontAwesomeIcon
                    icon={faWarning}
                    className="text-red-600 h-6 inline-block"
                />
                <span className="inline-block mx-4">{serverError}</span>
            </div>
        );
    }

    return <>{children}</>;
};

export { AppInitialisation };
