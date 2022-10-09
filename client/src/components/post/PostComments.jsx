import { formatDistance } from "date-fns";
import { Spinner } from "../ui/Spinner";

const PostComments = ({
    comments,
    next,
    getMoreComments,
    isGettingMoreComments
}) => {
    const hasNextPage = Boolean(next);
    return (
        <ul className="grid grid-cols-1 gap-4 mt-4">
            {comments.map(comment => {
                const { id, content, createdAt, user } = comment;
                const { avatar, firstName, lastName } = user;
                return (
                    <li key={id} className="flex">
                        <img
                            src={avatar}
                            className="rounded-full flex-none mr-2 w-9 h-9"
                            alt={`${firstName}-${lastName}`}
                        />
                        <div className="flex-1 rounded-xl bg-slate-100 p-2">
                            <span className="block font-bold">{`${firstName} ${lastName}`}</span>
                            <span className="block my-1">{content}</span>
                            <span className="block text-xs">
                                {formatDistance(
                                    new Date(createdAt),
                                    new Date(),
                                    {
                                        addSuffix: true
                                    }
                                )}
                            </span>
                        </div>
                    </li>
                );
            })}
            {hasNextPage && (
                <li className="text-center">
                    {isGettingMoreComments ? (
                        <Spinner />
                    ) : (
                        <button
                            className="hover:underline h-7"
                            onClick={getMoreComments}
                        >
                            View more comments
                        </button>
                    )}
                </li>
            )}
        </ul>
    );
};

export { PostComments };
