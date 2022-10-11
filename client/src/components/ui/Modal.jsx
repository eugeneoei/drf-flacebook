const Modal = ({ children }) => {
    return (
        <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-10 overflow-x-hidden overflow-y-auto">
            <div className="my-12 mx-auto max-w-md">
                <div className="bg-white p-8 rounded-xl">{children}</div>
            </div>
        </div>
    );
};

export { Modal };
