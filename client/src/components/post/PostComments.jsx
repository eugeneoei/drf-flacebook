import { formatDistance } from "date-fns";
import { Spinner } from "../ui/Spinner";
import { usePost } from "../../contexts/usePost";

const PostComments = () => {
    const {
        isLoadingMorePostComments,
        handleLoadMorePostComments,
        postComments,
        hasMorePostComments,
        updatePostComments
    } = usePost();

    const handleLoadMore = () => {
        handleLoadMorePostComments(updatePostComments)
    }

    return (
        <ul className="grid grid-cols-1 gap-4 mt-4">
            {postComments.map(comment => {
                const { id, content, createdAt, user } = comment;
                const { avatar, firstName, lastName } = user;
                return (
                    <li key={id} className="flex">
                        <img
                            src={avatar}
                            className="rounded-full flex-none mr-2 w-9 h-9"
                            alt={`${firstName}-${lastName}`}
                        />
                        <div className="flex-1 rounded-xl bg-slate-100 px-3 py-2">
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
            {hasMorePostComments && (
                <li className="text-center">
                    {isLoadingMorePostComments ? (
                        <Spinner />
                    ) : (
                        <button
                            className="hover:underline h-7"
                            onClick={handleLoadMore}
                        >
                            View more comments
                        </button>
                    )}
                </li>
            )}
            {postComments.length === 0 && (
                <li className="text-center">Be the first to comment!</li>
            )}
        </ul>
    );
};

export { PostComments };
