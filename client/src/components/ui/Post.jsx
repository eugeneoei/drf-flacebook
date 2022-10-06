import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";

const Post = ({ post, like, showComments }) => {
    const { id, content, createdAt, comments, user } = post;
    const { firstName, lastName, avatar } = user;
    const commentsCount = comments.count;
    return (
        <div className="rounded-lg bg-slate-100">
            <div className="p-4">
                <img
                    src={avatar}
                    className="rounded-full inline-block mr-2 w-16"
                    alt={`${firstName}-${lastName}`}
                />
                <div className="inline-block">
                    <span className="block font-bold">{`${firstName} ${lastName}`}</span>
                    <span className="block">{createdAt}</span>
                </div>
                <div className="my-4">
                    <p>{content}</p>
                </div>
                <div className="text-right pb-4 border-b-2 border-solid">
                    {`${commentsCount} Comment${commentsCount > 1 ? "s" : ""}`}
                </div>
                <div className="grid grid-cols-2 m-2">
                    <button
                        onClick={like}
                        className="hover:bg-white p-2 rounded-lg"
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="inline-block mr-2"
                        />
                        Like
                    </button>
                    <button
                        onClick={showComments}
                        className="hover:bg-white p-2 rounded-lg"
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            className="inline-block mr-2"
                        />
                        Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Post };
