import { createContext, useContext } from "react";
import { usePostActions } from "../hooks/usePostActions";
import { usePostComments } from "../hooks/usePostComments";

const PostContext = createContext();

const PostProvider = ({
    post,
    updatePostComments,
    addPostComment,
    children
}) => {
    const comments = usePostComments(post, updatePostComments, addPostComment);
    const postActions = usePostActions(post.content);

    const value = {
        ...comments,
        ...postActions
    };

    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
};

const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePost must be used within a PostProvider.");
    }
    return context;
};

export { PostProvider, usePost };
