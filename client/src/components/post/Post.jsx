import { useState } from "react";
import { usePostCommentsApi } from "../../hooks/usePostCommentsApi";
import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostActions } from "./PostActions";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";
import { getCursor } from "../../utils/urls";

const Post = ({
    post,
    like,
    loggedInUser,
    updatePostComments,
    addPostComment
}) => {
    const { id, content, createdAt, comments, user } = post;
    const { firstName, lastName, avatar } = user;
    const { count, results, next } = comments;

    const [showComments, setShowComments] = useState(false);
    const [isGettingMoreComments, setIsGettingMoreComments] = useState(false);
    const { getPostComments, createPostComment } = usePostCommentsApi();

    const handleShowComments = () => {
        setShowComments(true);
    };

    const handleGetMoreComments = async () => {
        const cursor = getCursor(next);
        setIsGettingMoreComments(true);
        const response = await getPostComments(
            `/api/posts/${id}/comments/?cursor=${cursor}`
        );
        updatePostComments(id, response);
        setIsGettingMoreComments(false);
    };

    const handleCreatePostComment = async (postId, content) => {
        const response = await createPostComment(postId, content);
        addPostComment(postId, response);
    };

    return (
        <PostLayout>
            <PostHeader
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                createdAt={createdAt}
            />
            <PostBody
                content={content}
                commentsCount={count}
                showComments={handleShowComments}
            />
            <PostActions like={like} showComments={handleShowComments} />
            {showComments && loggedInUser && (
                <PostCommentCreate
                    loggedInUser={loggedInUser}
                    createPostComment={handleCreatePostComment}
                    postId={id}
                />
            )}
            {showComments && (
                <PostComments
                    comments={results}
                    next={next}
                    getMoreComments={handleGetMoreComments}
                    isGettingMoreComments={isGettingMoreComments}
                />
            )}
        </PostLayout>
    );
};

export { Post };
