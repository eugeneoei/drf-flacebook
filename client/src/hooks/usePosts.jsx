import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { getCursor } from "../utils/urls";

const usePosts = () => {
    const [isGettingPosts, setIsGettingPosts] = useState(true);
    const [posts, setPosts] = useState(undefined);
    const [nextPageCursor, setNextPageCursor] = useState(undefined);
    const [hasNextPage, setHasNextPage] = useState(undefined);
    const [isGettingMorePosts, setIsGettingMorePosts] = useState(false);

    const updateNextPageState = url => {
        const hasMore = Boolean(url);
        setHasNextPage(hasMore);
        if (hasMore) {
            // const cursor = url.split("?cursor=")[1];

            setNextPageCursor(getCursor(url));
        }
    };

    const getPosts = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/posts/`);
            const { results, next } = response;
            // console.log(results)
            setPosts(results);
            updateNextPageState(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGettingPosts(false);
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
            // console.log(next)
            setPosts(posts => [...posts, ...results]);
            updateNextPageState(next);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGettingMorePosts(false);
        }
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

    // const [user, setUser] = useState();
    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then(response => response.json())
    //         .then(json => setUser(json));
    // }, []);

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input]);

    return {
        isGettingPosts,
        isGettingMorePosts,
        posts,
        hasNextPage,
        getMorePosts,
        updatePostComments,
        addPostComment
    };
};

export { usePosts };