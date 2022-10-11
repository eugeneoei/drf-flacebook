import { useState } from "react";

import { usePostCommentsApi } from "../../hooks/usePostCommentsApi";
import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostActions } from "./PostResponses";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";
import { getCursor } from "../../utils/urls";
import { lockBodyElement, unlockBodyElement } from "../../utils/dom";
import { PostEdit } from "./PostEdit";

const Post = ({
    post,
    like,
    loggedInUser,
    updatePostComments,
    addPostComment
}) => {
    const { id, content, createdAt, comments, user } = post;
    const { id: postUserId, firstName, lastName, avatar } = user;
    const { count, results, next } = comments;
    const isLoggedInUserPostOwner = loggedInUser?.id === postUserId;

    const [showComments, setShowComments] = useState(false);
    const [isGettingMoreComments, setIsGettingMoreComments] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
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

    const handleCreateComment = async (postId, content) => {
        const response = await createPostComment(postId, content);
        addPostComment(postId, response);
    };

    const handleEdit = () => {
        console.log("open edit post");
        setShowEditPost(true);
        lockBodyElement();
    };

    const handleCloseEdit = () => {
        console.log("close edit post");
        setShowEditPost(false);
        unlockBodyElement();
    };

    const handleUpdate = updatedContent => {
        console.log("update post");
        console.log("with following content:");
        console.log(updatedContent);
    };

    const handleDelete = () => {
        console.log("delete post")
    }

    return (
        <PostLayout>
            <PostHeader
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                createdAt={createdAt}
                showPostActions={isLoggedInUserPostOwner}
                editPost={handleEdit}
                deletePost={handleDelete}
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
                    createPostComment={handleCreateComment}
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
            {showEditPost && (
                <PostEdit
                    content={content}
                    close={handleCloseEdit}
                    update={handleUpdate}
                />
            )}
        </PostLayout>
    );
};

export { Post };
