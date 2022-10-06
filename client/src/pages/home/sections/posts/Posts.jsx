import { Post } from "../../../../components/ui/Post";

const Posts = ({ posts }) => {
    const handleLike = () => {
        // ! if user is not logged in, not allowed
        console.log("like post");
    };

    const handleShowComments = () => {
        console.log("show comments");
    };

    if (posts.length === 0) {
        return (
            <div className="text-center mt-4">
                <p>Ooops. Looks like there are no posts at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    like={handleLike}
                    showComments={handleShowComments}
                />
            ))}
        </div>
    );
};

export { Posts };
