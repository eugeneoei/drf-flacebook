import { usePost } from "../../contexts/usePost";
import { formatCount } from "../../utils/formatter";

const PostBody = () => {
    const { handleShowComments, content, numberOfComments } = usePost();
    return (
        <>
            <div className="my-4">
                <p>{content}</p>
            </div>
            <div className="text-right pb-4 border-b-2 border-solid">
                <button
                    className="hover:underline"
                    onClick={handleShowComments}
                >
                    {`${formatCount(numberOfComments)} Comment${
                        numberOfComments > 1 ? "s" : ""
                    }`}
                </button>
            </div>
        </>
    );
};

export { PostBody };
