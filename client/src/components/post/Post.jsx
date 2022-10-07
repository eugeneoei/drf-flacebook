import { useState } from "react";
import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostActions } from "./PostActions";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";

const Post = ({ post, like, loggedInUser, createComment }) => {
    const { id, content, createdAt, comments, user } = post;
    const { firstName, lastName, avatar } = user;
    const { count, data, hasNextPage } = comments;

    const [isShowComments, setIsShowComments] = useState(false);

    const handleShowComments = () => {
        console.log("show comments");
        setIsShowComments(true);
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
                    createComment={createComment}
                    postId={id}
                />
            )}
            {isShowComments && (
                <PostComments comments={data} hasNextPage={hasNextPage} />
            )}
        </PostLayout>
    );
};

export { Post };
