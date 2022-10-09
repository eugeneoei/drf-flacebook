import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const usePostsApi = () => {
    const [isGettingPosts, setIsGettingPosts] = useState(true);
    const [posts, setPosts] = useState(undefined);
    const [nextPageUrl, setNextPageUrl] = useState(undefined);
    const [hasNextPage, setHasNextPage] = useState(undefined);
    const [isGettingMorePosts, setIsGettingMorePosts] = useState(false);

    const getPosts = async () => {
        try {
            const response = await axiosInstance.get(`/api/posts/`);
            const { results, next } = response;
            setPosts(results);
            setHasNextPage(Boolean(next));
            setNextPageUrl(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGettingPosts(false);
        }
    };

    const getMorePosts = async () => {
        setIsGettingMorePosts(true);
        try {
            setIsGettingMorePosts(true);
            const response = await axiosInstance.get(nextPageUrl);
            const { results, next } = response;
            setPosts(posts => [...posts, ...results]);
            setHasNextPage(Boolean(next));
            setNextPageUrl(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGettingMorePosts(false);
        }
    };

    const updatePostComments = (postId, commentsResponse) => {
        const { results, next } = commentsResponse;
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: {
                        ...post.comments,
                        results: [...post.comments.results, ...results],
                        next
                    }
                };
            } else {
                return post;
            }
        });
        setPosts(updatedPosts);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return {
        isGettingPosts,
        isGettingMorePosts,
        posts,
        hasNextPage,
        getMorePosts,
        updatePostComments
    };
};

export { usePostsApi };
