import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { lockBodyElement, unlockBodyElement } from "../utils/dom";

const usePostCreate = () => {
    const [newPostContent, setNewPostContent] = useState("");
    const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const handlePostContentChange = e => {
        setNewPostContent(e.target.value);
    };

    const handleShowCreatePostModal = () => {
        lockBodyElement();
        setShowCreatePostModal(true);
    };

    const handleCloseCreatePostModal = () => {
        unlockBodyElement();
        setShowCreatePostModal(false);
    };

    const handleCreatePost = async callback => {
        try {
            setIsCreatingNewPost(true);
            const response = await axiosInstance.post("/api/posts/", {
                content: newPostContent
            });
            callback(response);
            setIsCreatingNewPost(false);
            handleCloseCreatePostModal();
        } catch (error) {
            console.log("error creating new post");
            console.log(error);
        }
    };

    return {
        isCreatingNewPost,
        handlePostContentChange,
        handleCreatePost,
        showCreatePostModal,
        handleShowCreatePostModal,
        handleCloseCreatePostModal
    };
};

export { usePostCreate };
