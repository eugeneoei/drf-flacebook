const PostBody = ({ content, commentsCount, showComments }) => {
    return (
        <>
            <div className="my-4">
                <p>{content}</p>
            </div>
            <div className="text-right pb-4 border-b-2 border-solid">
                <button className="hover:underline" onClick={showComments}>
                    {`${commentsCount} Comment${commentsCount > 1 ? "s" : ""}`}
                </button>
            </div>
        </>
    );
};

export { PostBody };
