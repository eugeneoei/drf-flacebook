import { createContext, useContext } from "react";
import { usePostActions } from "../hooks/usePostActions";
import { usePostComments } from "../hooks/usePostComments";

const PostContext = createContext();

const PostProvider = ({
    post,
    updatePostComments,
    addPostComment,
    updatePost,
    deletePost,
    children
}) => {
    const { id, content, createdAt, user, comments } = post
    const postComments = usePostComments(id, comments);
    const postActions = usePostActions(
        id,
        content,
        updatePost,
        deletePost
    );

    const value = {
        content,
        createdAt,
        user,
        ...postComments,
        ...postActions,
        updatePostComments,
        addPostComment
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
