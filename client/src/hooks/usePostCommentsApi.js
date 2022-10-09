import { axiosInstance } from "../utils/axiosInstance";

const usePostCommentsApi = () => {
    // const createPostComment = async data => {
    //     console.log("creating post comments")
    // }

    const createPostComment = (userId, postId, content) => {
        console.log("creating comment for");
        console.log("post id: ", postId);
        console.log("by user id: ", userId);
        console.log("with content: ", content);
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
