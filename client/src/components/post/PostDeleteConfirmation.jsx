import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../../contexts/usePost";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

const PostDeleteConfirmation = () => {
    const { handleCloseDeleteConfirmation, isDeletingPost, handleDelete } =
        usePost();
    return (
        <Modal>
            <div className="relative">
                <h1 className="text-lg font-bold">Delete Post</h1>
                <button
                    className="hover:bg-slate-100 p-2 rounded-full w-10 h-10 absolute right-0 -top-2"
                    onClick={handleCloseDeleteConfirmation}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="h-4 text-slate-500"
                    />
                </button>
            </div>
            <div className="mt-4 text-center">
                <p className="py-4">
                    Are you sure you want to delete this post?
                </p>
                <div className="mt-4">
                    {isDeletingPost ? (
                        <Spinner />
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                type="button"
                                text="Yes, delete post"
                                classes="!p-2"
                                click={handleDelete}
                            />
                            <Button
                                type="button"
                                text="No, cancel"
                                classes="!p-2 !invert"
                                click={handleCloseDeleteConfirmation}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export { PostDeleteConfirmation };
