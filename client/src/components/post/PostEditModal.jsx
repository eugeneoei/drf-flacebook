import { Modal } from "../ui/Modal";
import { usePost } from "../../contexts/usePost";
import { Spinner } from "../ui/Spinner";

const PostEditModal = () => {
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
        <Modal title="Edit Post" close={handleCloseEditPostModal}>
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

export { PostEditModal };
