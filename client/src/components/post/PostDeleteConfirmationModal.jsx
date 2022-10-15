import { usePost } from "../../contexts/usePost";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

const PostDeleteConfirmationModal = () => {
    const {
        handleCloseDeleteConfirmationModal,
        isDeletingPost,
        handleDeletePost,
        removePostFromStore
    } = usePost();

    const handleDelete = () => {
        handleDeletePost(removePostFromStore)
    }

    return (
        <Modal title="Delete Post" close={handleCloseDeleteConfirmationModal}>
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
                                click={handleCloseDeleteConfirmationModal}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export { PostDeleteConfirmationModal };
