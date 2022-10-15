import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ title, close, children }) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-10 overflow-x-hidden overflow-y-auto">
            <div className="my-12 mx-auto max-w-md">
                <div className="bg-white p-8 rounded-xl">
                    <div className="relative">
                        <h1 className="text-lg font-bold">{title}</h1>
                        <button
                            className="hover:bg-slate-100 p-2 rounded-full w-10 h-10 absolute right-0 -top-2"
                            onClick={close}
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="h-4 text-slate-500"
                            />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
