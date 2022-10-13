import { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { lockBodyElement, unlockBodyElement } from "../utils/dom";

const usePostActions = postContent => {

    const [showEditPost, setShowEditPost] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(postContent);

    const postActionsRef = useRef(null);
    useClickAway(postActionsRef, () => {
        setShowActionsPopper(false);
    });
    const [showActionsPopper, setShowActionsPopper] = useState(false);

    const handleToggleShowActions = () => {
        console.log("toggling")
        setShowActionsPopper(!showActionsPopper);
    };

    const handleEdit = () => {
        console.log("open edit post");
        setShowEditPost(true);
        setShowActionsPopper(false);
        lockBodyElement();
    };

    const handleCloseEdit = () => {
        console.log("close edit post");
        setShowEditPost(false);
        unlockBodyElement();
    };

    const handleContentChange = e => {
        setUpdatedContent(e.target.value);
    };

    const handleUpdate = e => {
        e.preventDefault();
        console.log("update post");
        console.log("with following content:");
        console.log(updatedContent);
    };

    const handleDelete = () => {
        console.log("delete post");
    };

    return {
        showEditPost,
        updatedContent,
        handleEdit,
        handleCloseEdit,
        handleContentChange,
        handleUpdate,
        handleDelete,

        showActionsPopper,
        handleToggleShowActions,
        postActionsRef
    }

}

export { usePostActions }