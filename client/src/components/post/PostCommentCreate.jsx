import { usePost } from "../../contexts/usePost";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

const PostCommentCreate = () => {
    const { loggedInUser } = useLoggedInUser();
    const { avatar, firstName, lastName } = loggedInUser;

    const { postComment, handlePostCommentChange, handleCreatePostComment } =
        usePost();

    return (
        <div className="flex mt-4">
            <img
                src={avatar}
                className="rounded-full flex-none mr-2 w-9 h-9"
                alt={`${firstName}-${lastName}`}
            />
            <form className="flex-1" onSubmit={handleCreatePostComment}>
                <input
                    placeholder="Write a comment..."
                    className="rounded-xl bg-slate-100 px-3 py-2 w-full focus:outline-none resize-y"
                    value={postComment}
                    onChange={handlePostCommentChange}
                />
            </form>
        </div>
    );
};

export { PostCommentCreate };
