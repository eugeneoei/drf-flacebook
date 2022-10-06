import { useGetPosts } from "../../hooks/useGetPosts";
import { Spinner } from "../../components/ui/Spinner";
import { Posts } from "./sections/posts/Posts"

const Home = () => {
    const { isGettingPosts, posts } = useGetPosts()

    if (isGettingPosts) {
        return (
            <div className="text-center mt-4">
                <div className="my-4">
                    <Spinner />
                </div>
                <p>Posts loading...</p>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center mt-4">
                <p>Ooops. Looks like there are no posts at the moment.</p>
            </div>
        )
    }

    return (
        <div className="max-w-xl mt-8 mx-auto">
            <Posts posts={posts} />
        </div>
    );
};

export { Home };
