import { useState } from "react";

const PostCommentCreate = ({ postId, loggedInUser, createPostComment }) => {
    const { avatar, firstName, lastName } = loggedInUser;
    const [comment, setComment] = useState("");

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        createPostComment(postId, comment);
        setComment("");
    };

    return (
        <div className="flex mt-4">
            <img
                src={avatar}
                className="rounded-full flex-none mr-2 w-9 h-9"
                alt={`${firstName}-${lastName}`}
            />
            <form className="flex-1" onSubmit={handleSubmit}>
                <input
                    placeholder="Write a comment..."
                    className="rounded-xl bg-slate-100 px-3 py-2 w-full focus:outline-none resize-y"
                    value={comment}
                    onChange={handleCommentChange}
                />
            </form>
        </div>
    );
};

export { PostCommentCreate };
