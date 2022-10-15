import { useLoggedInUser } from "../../contexts/useLoggedInUser";
import { usePostCreate } from "../../hooks/usePostCreate";
import { PostCreateModal } from "./PostCreateModal";

const PostCreate = ({ addPostToStore }) => {
    const { loggedInUser } = useLoggedInUser();
    const { avatar, firstName, lastName } = loggedInUser;
    const {
        showCreatePostModal,
        handleShowCreatePostModal,
        handleCloseCreatePostModal,
        handlePostContentChange,
        newPostContent,
        isCreatingNewPost,
        handleCreatePost
    } = usePostCreate();

    const handleSubmit = () => {
        handleCreatePost(addPostToStore);
    };

    return (
        <div className="flex rounded-lg bg-white p-4">
            <img
                src={avatar}
                className="flex-none rounded-full inline-block mr-2 w-12"
                alt={`${firstName}-${lastName}`}
            />
            <button
                className="flex-1 text-left px-6 py-2 bg-slate-100 rounded-full hover:bg-slate-200 hover:underline "
                onClick={handleShowCreatePostModal}
            >
                {`What's on your mind, ${firstName}?`}
            </button>
            {showCreatePostModal && (
                <PostCreateModal
                    close={handleCloseCreatePostModal}
                    onChange={handlePostContentChange}
                    value={newPostContent}
                    isCreating={isCreatingNewPost}
                    submit={handleSubmit}
                />
            )}
        </div>
    );
};

export { PostCreate };
