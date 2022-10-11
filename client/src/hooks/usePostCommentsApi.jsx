import { axiosInstance } from "../utils/axiosInstance";

const usePostCommentsApi = () => {
    const createPostComment = async (postId, content) => {
        try {
            const apiEndpoint = `/api/posts/${postId}/comments/`;
            const response = await axiosInstance.post(apiEndpoint, {
                content
            });
            return response;
        } catch (error) {
            console.log("create post comment error");
            console.log(error);
        }
    };

    const getPostComments = async url => {
        try {
            const response = await axiosInstance.get(url);
            const { results, next } = response;
            return {
                results,
                next
            };
        } catch (error) {
            console.log("get more post comments error");
            console.log(error);
        }
    };

    return {
        getPostComments,
        createPostComment
    };
};

export { usePostCommentsApi };
