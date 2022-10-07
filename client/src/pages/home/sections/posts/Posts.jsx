// import { usePosts } from "../../../../contexts/usePosts";
import { useLoggedInUser } from "../../../../contexts/useLoggedInUser"
import { usePostsApi } from "../../../../hooks/usePostsApi";
import { Post } from "../../../../components/post/Post";
import { PostSkeleton } from "../../../../components/post/PostSkeleton";

const Posts = () => {

    const { loggedInUser } = useLoggedInUser()
    const { isGettingPosts, posts, hasNextPage, loadMorePosts } = usePostsApi()

    const handleLike = () => {
        // ! if user is not logged in, not allowed
        console.log("like post");
    };

    const handleCreateComment = (userId, postId, content) => {
        console.log("creating comment for")
        console.log("post id: ", postId)
        console.log("by user id: ", userId)
        console.log("with content: ", content)
    }

    if (isGettingPosts) {
        return (
            <div className="grid grid-cols-1 gap-4">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center">
                <p>Ooops. Looks like there are no posts at the moment.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    like={handleLike}
                    loggedInUser={loggedInUser}
                    createComment={handleCreateComment}
                />
            ))}
            {
                hasNextPage && (
                    <>
                        <PostSkeleton />
                        <PostSkeleton />
                    </>
                )
            }
        </div>
    );
};

export { Posts };
