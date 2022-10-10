import { useInView } from "react-cool-inview";
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
        updatePostComments,
        addPostComment
    } = usePostsApi();

    const handleLike = () => {
        // ! if user is not logged in, not allowed
        console.log("like post");
    };

    const { observe } = useInView({
        threshold: 0.01,
        onEnter: () => {
            if (hasNextPage && !isGettingMorePosts) {
                getMorePosts();
            }
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
                    updatePostComments={updatePostComments}
                    addPostComment={addPostComment}
                />
            ))}
            {hasNextPage && (
                <div ref={observe}>
                    <PostSkeleton />
                    <PostSkeleton marginTop />
                    <PostSkeleton marginTop />
                </div>
            )}
        </div>
    );
};

export { Posts };
