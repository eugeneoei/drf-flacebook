import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { getCursor } from "../utils/urls";

const usePosts = () => {
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [posts, setPosts] = useState(undefined);
    const [nextPageCursor, setNextPageCursor] = useState(undefined);
    const [hasMorePosts, setHasMorePosts] = useState(undefined);
    const [isGettingMorePosts, setIsGettingMorePosts] = useState(false);

    const updateNextPageState = url => {
        const hasMore = Boolean(url);
        setHasMorePosts(hasMore);
        if (hasMore) {
            setNextPageCursor(getCursor(url));
        }
    };

    const getPosts = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/posts/`);
            const { results, next } = response;
            setPosts(results);
            updateNextPageState(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingPosts(false);
        }
    }, []);

    const getMorePosts = async () => {
        setIsGettingMorePosts(true);
        try {
            setIsGettingMorePosts(true);
            const response = await axiosInstance.get(
                `/api/posts/?cursor=${nextPageCursor}`
            );
            const { results, next } = response;
            setPosts(posts => [...posts, ...results]);
            updateNextPageState(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGettingMorePosts(false);
        }
    };

    const addPostToStore = post => {
        const updatedPosts = [post, ...posts]
        setPosts(updatedPosts)
    }

    const updatePostInStore = (postId, content) => {
        const updatedPosts = posts.map(post =>
            post.id === postId
                ? {
                      ...post,
                      content
                  }
                : post
        );
        setPosts(updatedPosts);
    };

    const removePostFromStore = postId => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    const updatePostComments = (postId, moreCommentsResponse) => {
        const { results, next } = moreCommentsResponse;
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

    const addPostComment = (postId, newComment) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: {
                        ...post.comments,
                        count: post.comments.count + 1,
                        results: [newComment, ...post.comments.results]
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
    }, [getPosts]);

    return {
        isLoadingPosts,
        isGettingMorePosts,
        posts,
        hasMorePosts,
        getMorePosts,
        updatePostComments,
        addPostComment,
        addPostToStore,
        updatePostInStore,
        removePostFromStore
    };
};

export { usePosts };
