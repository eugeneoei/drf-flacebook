import { formatDistance } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faPenToSquare,
    faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../../contexts/usePost";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

const PostHeader = () => {
    const {
        createdAt,
        user,
        handleOpenEditPostModal,
        handleShowDeleteConfirmationModal,
        showActionsPopper,
        handleTogglePostActionsPopper,
        postActionsRef
    } = usePost();
    const { loggedInUser } = useLoggedInUser();
    const { firstName, lastName, avatar } = user;
    const showPostActions = loggedInUser?.id === user.id;

    return (
        <div className="flex">
            <div className="flex-none">
                <img
                    src={avatar}
                    className="rounded-full inline-block mr-2 w-12"
                    alt={`${firstName}-${lastName}`}
                />
            </div>
            <div className="flex-1">
                <span className="block font-bold">{`${firstName} ${lastName}`}</span>
                <span className="block">
                    {formatDistance(new Date(createdAt), new Date(), {
                        addSuffix: true
                    })}
                </span>
            </div>
            {showPostActions && (
                <div className="flex-none relative" ref={postActionsRef}>
                    <button
                        className="hover:bg-slate-100 p-2 rounded-full w-10 h-10"
                        onClick={handleTogglePostActionsPopper}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className="h-6 text-slate-500"
                        />
                    </button>
                    {showActionsPopper && (
                        <div className="absolute -bottom-20 right-0 py-2 w-28 bg-white shadow-2xl border-2 border-gray-100">
                            <button
                                className="block hover:bg-slate-100 w-full text-left px-4 py-2"
                                onClick={handleOpenEditPostModal}
                            >
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="h-4 text-slate-500 mr-1"
                                />
                                Edit
                            </button>
                            <button
                                className="block mt-1 hover:bg-slate-100 w-full text-left px-4 py-2"
                                onClick={handleShowDeleteConfirmationModal}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="h-4 text-slate-500 mr-1"
                                />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { PostHeader };
