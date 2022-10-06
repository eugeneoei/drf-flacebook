import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

const useGetPosts = () => {
    const [isGettingPosts, setIsGettingPosts] = useState(true);
    const [posts, setPosts] = useState(undefined);
    // const [nextPage, setNext] = useState(undefined)

    // const getPosts = async (queryParams) => {

    // }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axiosInstance.get(
                    `${process.env.REACT_APP_API}/posts/`,
                )
                console.log(response)
                setPosts(response.results)
                // setTimeout(() => {
                //     setIsGettingPosts(false)
                // }, 2000)
            } catch (error) {
                console.log(error)
            } finally {
                setIsGettingPosts(false)
            }
        }
        getPosts()
        return () => getPosts;
    }, []);

    return {
        isGettingPosts,
        posts,
        // getPosts
    };
};

export { useGetPosts };
