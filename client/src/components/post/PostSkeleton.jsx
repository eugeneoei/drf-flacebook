const PostSkeleton = ({ marginTop }) => {
    return (
        <div
            className={`rounded-lg bg-white animate-pulse ${
                marginTop && "mt-4"
            }`}
        >
            <div className="p-4">
                <div className="rounded-full inline-block mr-2 w-16 h-16 bg-slate-100" />
                <div className="inline-block h-16">
                    <div className="block rounded-lg w-28 h-4 bg-slate-100" />
                    <div className="block rounded-lg w-36 h-4 mt-2 bg-slate-100" />
                </div>
                <div className="my-4">
                    <div className="w-full bg-slate-100 h-36 rounded-lg" />
                </div>
                <div className="flex justify-end pb-4 border-b-2 border-solid border-white">
                    <div className="block rounded-lg w-28 h-6 bg-slate-100" />
                </div>
                <div className="grid grid-cols-2 m-2 gap-2">
                    <div className="bg-slate-100 p-2 mt-2 h-8 rounded-lg" />
                    <div className="bg-slate-100 p-2 mt-2 h-8 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export { PostSkeleton };
