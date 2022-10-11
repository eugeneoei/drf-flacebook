// import { createContext, useContext, useState, useEffect } from "react";
// import { axiosInstance } from "../utils/axiosInstance";

// const PostsContext = createContext();

// const PostsProvider = ({ children }) => {
//     const [isGettingPosts, setIsGettingPosts] = useState(true);
//     const [posts, setPosts] = useState(undefined);
//     const [nextPage, setNextPage] = useState(undefined);
//     const [hasNextPage, setHasNextPage] = useState(undefined);

//     const loadMorePosts = async () => {
//         console.log("load more posts")
//         // const response = await axiosInstance.get(
//         //     `${process.env.REACT_APP_API}/posts/`
//         // );
//         // const { results, next } = response;
//         // setPosts(results);
//         // setHasNextPage(Boolean(next));
//         // setNextPage(next);
//     }

//     useEffect(() => {
//         console.log('getting posts')
//         const getPosts = async () => {
//             try {
//                 const response = await axiosInstance.get(
//                     `${process.env.REACT_APP_API}/posts/`
//                 );
//                 // console.log(response)
//                 const { results, next } = response;
//                 setPosts(results);
//                 setHasNextPage(Boolean(next));
//                 setNextPage(next);
//                 // setTimeout(() => {
//                 //     setIsGettingPosts(false)
//                 // }, 2000)
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setIsGettingPosts(false);
//             }
//         };
//         getPosts();
//         return () => getPosts;
//     }, []);

//     const value = {
//         isGettingPosts,
//         posts,
//         hasNextPage,
//         loadMorePosts
//         // getPosts
//     };

//     return (
//         <PostsContext.Provider value={value}>
//             {children}
//         </PostsContext.Provider>
//     );
// }

// const usePosts = () => {
//     const context = useContext(PostsContext);
//     if (context === undefined) {
//         throw new Error(
//             "usePosts must be used within a PostsProvider."
//         );
//     }
//     return context;
// }

// export { PostsProvider, usePosts };