import { usePost } from "../../contexts/usePost";
import { formatCount } from "../../utils/formatter";

const PostBody = () => {
    const { handleShowPostComments, content, numberOfPostComments } = usePost();
    return (
        <>
            <div className="my-4">
                <p>{content}</p>
            </div>
            <div className="text-right pb-4 border-b-2 border-solid">
                <button
                    className="hover:underline"
                    onClick={handleShowPostComments}
                >
                    {`${formatCount(numberOfPostComments)} Comment${
                        numberOfPostComments > 1 ? "s" : ""
                    }`}
                </button>
            </div>
        </>
    );
};

export { PostBody };
