import { usePost } from "../../contexts/usePost";
import { useLoggedInUser } from "../../contexts/useLoggedInUser";

import { PostLayout } from "./PostLayout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";
import { PostResponses } from "./PostResponses";
import { PostCommentCreate } from "./PostCommentCreate";
import { PostComments } from "./PostComments";
import { PostEdit } from "./PostEdit";
import { PostDeleteConfirmation } from "./PostDeleteConfirmation";

const Post = ({ like }) => {
    const { showPostComments, showEditPost, showDeleteConfirmationModal } = usePost();
    const { loggedInUser } = useLoggedInUser();
    const isLoggedIn = Boolean(loggedInUser);

    const showPostCommensCreate = showPostComments && isLoggedIn
    const showPostEditModal = showEditPost && !showDeleteConfirmationModal;
    const showPostDeleteConfirmationModal =
        !showEditPost && showDeleteConfirmationModal;

    return (
        <PostLayout>
            <PostHeader />
            <PostBody />
            <PostResponses like={like} />
            {showPostCommensCreate && <PostCommentCreate />}
            {showPostComments && <PostComments />}
            {showPostEditModal && <PostEdit />}
            {showPostDeleteConfirmationModal && <PostDeleteConfirmation />}
        </PostLayout>
    );
};

export { Post };
