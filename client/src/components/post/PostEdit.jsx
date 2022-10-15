import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../ui/Modal";
import { usePost } from "../../contexts/usePost";
import { Spinner } from "../ui/Spinner";

const PostEdit = () => {
    const {
        updatedPostContent,
        handleCloseEditPostModal,
        handlePostContentChange,
        isUpdatingPost,
        handleUpdatePost,
        updatePostInStore
    } = usePost();

    const handleSubmit = () => {
        handleUpdatePost(updatePostInStore);
    };

    return (
        <Modal>
            <div className="relative">
                <h1 className="text-lg font-bold">Edit Post</h1>
                <button
                    className="hover:bg-slate-100 p-2 rounded-full w-10 h-10 absolute right-0 -top-2"
                    onClick={handleCloseEditPostModal}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="h-4 text-slate-500"
                    />
                </button>
            </div>
            <div className="text-center">
                <textarea
                    className="rounded-xl bg-slate-100 w-full p-4 focus:outline-none resize-y my-4 disabled:hover:cursor-progress disabled:opacity-60"
                    rows={20}
                    value={updatedPostContent}
                    onChange={handlePostContentChange}
                    disabled={isUpdatingPost}
                />
                {isUpdatingPost ? (
                    <Spinner />
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-sky-700 border-2 border-sky-700 rounded text-white p-2"
                    >
                        Update
                    </button>
                )}
            </div>
        </Modal>
    );
};

export { PostEdit };
