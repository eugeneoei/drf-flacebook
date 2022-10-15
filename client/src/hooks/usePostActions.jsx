import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { axiosInstance } from "../utils/axiosInstance";
import { lockBodyElement, unlockBodyElement } from "../utils/dom";

const usePostActions = (postId, postContent) => {
    const [updatedPostContent, setUpdatedPostContent] = useState(postContent);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
        useState(false);
    const [isUpdatingPost, setIsUpdatingPost] = useState(false);
    const [isDeletingPost, setIsDeletingPost] = useState(false);

    const postActionsRef = useRef(null);
    const [showActionsPopper, setShowActionsPopper] = useState(false);
    useClickAway(postActionsRef, () => {
        setShowActionsPopper(false);
    });

    const handleTogglePostActionsPopper = () => {
        setShowActionsPopper(!showActionsPopper);
    };

    const handleEditPost = () => {
        setShowEditPost(true);
        setShowActionsPopper(false);
        lockBodyElement();
    };

    const handleCloseEditPostModal = () => {
        setShowEditPost(false);
        setUpdatedPostContent(postContent);
        unlockBodyElement();
    };

    const handlePostContentChange = e => {
        setUpdatedPostContent(e.target.value);
    };

    const handleUpdatePost = async callback => {
        try {
            setIsUpdatingPost(true);
            const response = await axiosInstance.patch(
                `/api/posts/${postId}/`,
                {
                    content: updatedPostContent
                }
            );
            setIsUpdatingPost(false);
            setShowEditPost(false);
            unlockBodyElement();
            callback(postId, response.content);
        } catch (error) {
            console.log("Error updating post");
            console.log(error);
        }
    };

    const handleShowDeleteConfirmationModal = () => {
        setShowDeleteConfirmationModal(true);
        setShowActionsPopper(false);
        lockBodyElement();
    };

    const handleCloseDeleteConfirmationModal = () => {
        setShowDeleteConfirmationModal(false);
        unlockBodyElement();
    };

    const handleDeletePost = async () => {
        try {
            setIsDeletingPost(true);
            // await axiosInstance.delete(`/api/posts/${postId}/`);
            // setIsDeletingPost(false);
            // unlockBodyElement();
            // deletePost(postId);
        } catch (error) {
            console.log("Error deleting post");
            console.log(error);
        }
    };

    return {
        showEditPost,
        updatedPostContent,
        handleEditPost,
        handleCloseEditPostModal,
        handlePostContentChange,
        isUpdatingPost,
        handleUpdatePost,
        isDeletingPost,
        handleDeletePost,

        showActionsPopper,
        handleTogglePostActionsPopper,
        postActionsRef,

        showDeleteConfirmationModal,
        handleShowDeleteConfirmationModal,
        handleCloseDeleteConfirmationModal
    };
};

export { usePostActions };
