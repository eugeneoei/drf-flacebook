import { useState } from "react";
import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostActions } from "./PostActions";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";

const Post = ({
    post,
    like,
    loggedInUser,
    createPostComment,
    getMorePostComments
}) => {
    const { id, content, createdAt, comments, user } = post;
    const { firstName, lastName, avatar } = user;
    const { count, results, next } = comments;

    const [isShowComments, setIsShowComments] = useState(false);
    const [isGettingMoreComments, setIsGettingMoreComments] = useState(false);

    const handleShowComments = () => {
        setIsShowComments(true);
    };

    const handleGetMoreComments = () => {
        setIsGettingMoreComments(true);
        getMorePostComments(id, next);
        setIsGettingMoreComments(false);
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
            {isShowComments && loggedInUser && (
                <PostCommentCreate
                    loggedInUser={loggedInUser}
                    createPostComment={createPostComment}
                    postId={id}
                />
            )}
            {isShowComments && (
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
