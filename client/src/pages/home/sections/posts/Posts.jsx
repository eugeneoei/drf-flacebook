import { useEffect } from "react";
import { useLoggedInUser } from "../../../../contexts/useLoggedInUser";
import { usePostsApi } from "../../../../hooks/usePostsApi";
import { Post } from "../../../../components/post/Post";
import { PostSkeleton } from "../../../../components/post/PostSkeleton";

const Posts = () => {
    const { loggedInUser } = useLoggedInUser();
    const {
        posts,
        isGettingPosts,
        isGettingMorePosts,
        hasNextPage,
        getMorePosts,
    } = usePostsApi();

    const handleLike = () => {
        // ! if user is not logged in, not allowed
        console.log("like post");
    };

    const handleCreateComment = (userId, postId, content) => {
        console.log("creating comment for");
        console.log("post id: ", postId);
        console.log("by user id: ", userId);
        console.log("with content: ", content);
    };

    useEffect(() => {
        if (hasNextPage && !isGettingMorePosts) {
            const options = {
                threshold: 0.01
            };
            const callback = entries => {
                const skeletonsWrapper = entries[0];
                if (skeletonsWrapper.isIntersecting) {
                    getMorePosts();
                    observer.unobserve(document.querySelector("#loaders"));
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(document.querySelector("#loaders"));
        }
    });

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
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center">
                <p>Ooops. Looks like there are no posts at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4" id="posts">
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    like={handleLike}
                    loggedInUser={loggedInUser}
                    createComment={handleCreateComment}
                />
            ))}
            {hasNextPage && (
                <div id="loaders">
                    <PostSkeleton />
                    <PostSkeleton marginTop />
                </div>
            )}
        </div>
    );
};

export { Posts };
