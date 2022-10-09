import { useState } from "react";

const PostCommentCreate = ({ postId, loggedInUser, createPostComment }) => {
    const { id, avatar, firstName, lastName } = loggedInUser;
    const [comment, setComment] = useState("");

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        createPostComment(id, postId, comment);
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
                    type="text"
                    placeholder="Write a comment..."
                    className="rounded-xl bg-slate-100 px-4 py-1 w-full h-9 focus:outline-none"
                    value={comment}
                    onChange={handleCommentChange}
                />
            </form>
        </div>
    );
};

export { PostCommentCreate };
