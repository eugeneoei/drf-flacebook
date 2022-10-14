import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { usePost } from "../../contexts/usePost";

const PostResponses = ({ like }) => {
    const { handleShowPostComments } = usePost();
    return (
        <div className="grid grid-cols-2 p-1 gap-2 border-b-2 border-solid">
            <button
                onClick={like}
                className="hover:bg-slate-100 p-2 rounded-lg"
            >
                <FontAwesomeIcon
                    icon={faThumbsUp}
                    className="inline-block mr-2"
                />
                Like
            </button>
            <button
                onClick={handleShowPostComments}
                className="hover:bg-slate-100 p-2 rounded-lg"
            >
                <FontAwesomeIcon
                    icon={faComment}
                    className="inline-block mr-2"
                />
                Comment
            </button>
        </div>
    );
};

export { PostResponses };
