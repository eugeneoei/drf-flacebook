import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const AlertSnackbar = ({ message }) => {
    return (
        <div className=" bg-red-200/50 mt-4 px-4 py-2 rounded-lg">
            <FontAwesomeIcon icon={faCircleExclamation} className="inline-block mr-2 text-red-600" />
            {message}
        </div>
    );
};

export { AlertSnackbar };
