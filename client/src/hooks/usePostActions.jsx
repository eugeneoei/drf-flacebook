import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { axiosInstance } from "../utils/axiosInstance";
import { lockBodyElement, unlockBodyElement } from "../utils/dom";

const usePostActions = (postId, postContent, updatePost, deletePost) => {
    const [updatedContent, setUpdatedContent] = useState(postContent);
    const [showEditPost, setShowEditPost] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [isUpdatingPost, setIsUpdatingPost] = useState(false);
    const [isDeletingPost, setIsDeletingPost] = useState(false);

    const postActionsRef = useRef(null);
    useClickAway(postActionsRef, () => {
        setShowActionsPopper(false);
    });
    const [showActionsPopper, setShowActionsPopper] = useState(false);

    const handleToggleShowActions = () => {
        setShowActionsPopper(!showActionsPopper);
    };

    const handleEdit = () => {
        setShowEditPost(true);
        setShowActionsPopper(false);
        lockBodyElement();
    };

    const handleCloseEdit = () => {
        setShowEditPost(false);
        setUpdatedContent(postContent);
        unlockBodyElement();
    };

    const handleContentChange = e => {
        setUpdatedContent(e.target.value);
    };

    const handleUpdate = async e => {
        try {
            e.preventDefault();
            setIsUpdatingPost(true);
            const response = await axiosInstance.patch(
                `/api/posts/${postId}/`,
                {
                    content: updatedContent
                }
            );
            setIsUpdatingPost(false);
            setShowEditPost(false);
            unlockBodyElement();
            updatePost(postId, response);
        } catch (error) {
            console.log("Error updating post");
            console.log(error);
        }
    };

    const handleShowDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
        setShowActionsPopper(false);
        lockBodyElement();
    };

    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
        unlockBodyElement();
    };

    const handleDelete = async () => {
        try {
            setIsDeletingPost(true);
            await axiosInstance.delete(`/api/posts/${postId}/`);
            setIsDeletingPost(false);
            unlockBodyElement();
            deletePost(postId);
        } catch (error) {
            console.log("Error deleting post");
            console.log(error);
        }
    };

    return {
        showEditPost,
        updatedContent,
        handleEdit,
        handleCloseEdit,
        handleContentChange,
        isUpdatingPost,
        handleUpdate,
        isDeletingPost,
        handleDelete,

        showActionsPopper,
        handleToggleShowActions,
        postActionsRef,

        showDeleteConfirmation,
        handleShowDeleteConfirmation,
        handleCloseDeleteConfirmation
    };
};

export { usePostActions };
