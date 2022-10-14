import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { getCursor } from "../utils/urls";

const usePostComments = (postId, comments) => {
    const {
        next,
        count: numberOfPostComments,
        results: postComments
    } = comments;
    const cursor = getCursor(next);
    const hasMorePostComments = Boolean(next);

    const [showPostComments, setShowPostComments] = useState(false);
    const [isLoadingMorePostComments, setIsLoadingMorePostComments] =
        useState(false);
    const [postComment, setPostComment] = useState("");

    const handleShowPostComments = () => {
        setShowPostComments(true);
    };

    const handlePostCommentChange = e => {
        setPostComment(e.target.value);
    };

    const handleLoadMorePostComments = async callback => {
        setIsLoadingMorePostComments(true);
        const response = await axiosInstance.get(
            `/api/posts/${postId}/comments/?cursor=${cursor}`
        );
        const { results, next } = response;
        callback(postId, {
            results,
            next
        });
        setIsLoadingMorePostComments(false);
    };

    const handleCreatePostComment = async callback => {
        try {
            const apiEndpoint = `/api/posts/${postId}/comments/`;
            const response = await axiosInstance.post(apiEndpoint, {
                content: postComment
            });
            callback(postId, response);
            setPostComment("");
        } catch (error) {
            console.log("create post comment error");
            console.log(error);
        }
    };

    return {
        hasMorePostComments,
        postComments,
        numberOfPostComments,
        showPostComments,
        handleShowPostComments,
        isLoadingMorePostComments,
        handleLoadMorePostComments,
        postComment,
        handlePostCommentChange,
        handleCreatePostComment
    };
};

export { usePostComments };
