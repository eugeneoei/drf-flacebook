import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
// import { formatDistance } from "date-fns";

const usePostsApi = () => {
    const [isGettingPosts, setIsGettingPosts] = useState(true);
    const [posts, setPosts] = useState(undefined);
    const [nextPage, setNextPage] = useState(undefined);
    const [hasNextPage, setHasNextPage] = useState(undefined);

    // const getPosts = async (queryParams) => {

    // }

    // console.log(Boolean(null))

    const loadMorePosts = async () => {
        console.log("load more posts")
        // const response = await axiosInstance.get(
        //     `${process.env.REACT_APP_API}/posts/`
        // );
        // const { results, next } = response;
        // setPosts(results);
        // setHasNextPage(Boolean(next));
        // setNextPage(next);
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axiosInstance.get(
                    `${process.env.REACT_APP_API}/posts/`
                );
                console.log(response)
                const { results, next } = response;
                setPosts(results);
                setHasNextPage(Boolean(next));
                setNextPage(next);
                // setTimeout(() => {
                //     setIsGettingPosts(false)
                // }, 2000)
            } catch (error) {
                console.log(error);
            } finally {
                setIsGettingPosts(false);
            }
        };
        getPosts();
        return () => getPosts;
    }, []);

    return {
        isGettingPosts,
        posts,
        hasNextPage,
        loadMorePosts
        // getPosts
    };
};

export { usePostsApi };
