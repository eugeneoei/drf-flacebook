import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { Spinner } from "../ui/Spinner";

const AppInitialisation = ({ children }) => {
    const { isLoading, serverError } = useLoggedInUser();

    if (isLoading) {
        return (
            <div className="text-center">
                <Spinner />
            </div>
        );
    }

    if (serverError) {
        return (
            <div>
                <FontAwesomeIcon icon={faWarning} />
                <span>{serverError}</span>
            </div>
        );
    }

    return <>{children}</>;
};

export { AppInitialisation };
