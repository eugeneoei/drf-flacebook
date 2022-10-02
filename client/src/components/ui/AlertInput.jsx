import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const AlertInput = ({ message }) => {
    return (
        <div className="mt-2 text-red-600">
            <FontAwesomeIcon icon={faCircleExclamation} className="inline-block mr-2" />
            {message}
        </div>
    );
};

export { AlertInput };
