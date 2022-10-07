// import { PostsProvider } from "../../contexts/usePosts";
import { Posts } from "./sections/posts/Posts"

const Home = () => {
    return (
        // <PostsProvider>
            <div className="max-w-xl mx-auto">
                <Posts />
            </div>
        // </PostsProvider>
    );
};

export { Home };
