import { formatDistance } from "date-fns";

const PostHeader = ({ avatar, firstName, lastName, createdAt }) => {
    return (
        <>
            <img
                src={avatar}
                className="rounded-full inline-block mr-2 w-16"
                alt={`${firstName}-${lastName}`}
            />
            <div className="inline-block">
                <span className="block font-bold">{`${firstName} ${lastName}`}</span>
                <span className="block">
                    {formatDistance(new Date(createdAt), new Date(), {
                        addSuffix: true
                    })}
                </span>
            </div>
        </>
    );
};

export { PostHeader };
