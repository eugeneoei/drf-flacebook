import { useInView } from "react-cool-inview";
import { PostProvider } from "../../../../contexts/usePost";
import { usePosts } from "../../../../hooks/usePosts";
import { Post } from "../../../../components/post/Post";
import { PostSkeleton } from "../../../../components/post/PostSkeleton";

const Posts = () => {
    const {
        posts,
        isGettingPosts,
        isGettingMorePosts,
        hasNextPage,
        getMorePosts,
        updatePostComments,
        addPostComment
    } = usePosts();

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
                <PostProvider
                    key={post.id}
                    // id={post.id}
                    // cursor={getCursor(post.comments.next)}
                    post={post}
                    updatePostComments={updatePostComments}
                    addPostComment={addPostComment}
                >
                    <Post
                        // post={post}
                        like={handleLike}
                        // loggedInUser={loggedInUser}
                        // updatePostComments={updatePostComments}
                        // addPostComment={addPostComment}
                    />
                </PostProvider>
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
