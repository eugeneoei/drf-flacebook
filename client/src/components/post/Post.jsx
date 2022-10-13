import { usePost } from "../../contexts/usePost";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostActions } from "./PostResponses";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";
import { PostEdit } from "./PostEdit";

const Post = ({ like }) => {
    const { showComments, showEditPost } = usePost();
    const { loggedInUser } = useLoggedInUser();
    const isLoggedIn = Boolean(loggedInUser);

    return (
        <PostLayout>
            <PostHeader />
            <PostBody />
            <PostActions like={like} />
            {showComments && isLoggedIn && <PostCommentCreate />}
            {showComments && <PostComments />}
            {showEditPost && <PostEdit />}
        </PostLayout>
    );
};

export { Post };
