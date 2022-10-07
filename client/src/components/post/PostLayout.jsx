const PostLayout = ({ children }) => {
    return (
        <div className="rounded-lg bg-white">
            <div className="p-4">{children}</div>
        </div>
    );
};

export { PostLayout };
