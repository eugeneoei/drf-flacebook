import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { getCursor } from "../utils/urls";

const usePostComments = (post, updatePostComments, addPostComment) => {

    const { id, content, createdAt, comments, user } = post
    const { next, count: numberOfComments, results } = comments
    const cursor = getCursor(next)
    const hasNextPage = Boolean(next)

    const [showComments, setShowComments] = useState(false)
    const [isGettingMoreComments, setIsGettingMoreComments] = useState(false);
    const [comment, setComment] = useState("");

    const handleShowComments = () => {
        setShowComments(true);
    };

    const handleCommentChange = e => {
        setComment(e.target.value)
    };

    const handleGetComments = async () => {
        setIsGettingMoreComments(true);
        const response = await axiosInstance.get(
            `/api/posts/${id}/comments/?cursor=${cursor}`
        );
        const { results, next } = response;
        updatePostComments(id, {
            results,
            next
        });
        setIsGettingMoreComments(false);
    };

    const handleCreateComment = async e => {
        e.preventDefault();
        try {
            const apiEndpoint = `/api/posts/${id}/comments/`;
            const response = await axiosInstance.post(apiEndpoint, {
                content: comment
            });
            addPostComment(id, response)
            setComment("")
        } catch (error) {
            console.log("create post comment error");
            console.log(error);
        }
    };

    return {
        id,
        content,
        createdAt,
        user,
        hasNextPage,
        comments: results,
        numberOfComments,
        showComments,
        handleShowComments,
        isGettingMoreComments,
        handleGetComments,
        comment,
        handleCommentChange,
        handleCreateComment,
    };
};

export { usePostComments };
