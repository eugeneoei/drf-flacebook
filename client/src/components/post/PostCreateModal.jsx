import { Modal } from "../ui/Modal";
import { Spinner } from "../ui/Spinner";

const PostCreateModal = ({ close, onChange, isCreating, value, submit }) => {
    return (
        <Modal title="Create Post" close={close}>
            <div className="text-center">
                <textarea
                    className="rounded-xl bg-slate-100 w-full p-4 focus:outline-none resize-y my-4 disabled:hover:cursor-progress disabled:opacity-60"
                    rows={15}
                    value={value}
                    onChange={onChange}
                    disabled={isCreating}
                />
                {isCreating ? (
                    <Spinner />
                ) : (
                    <button
                        type="button"
                        onClick={submit}
                        className="w-full bg-sky-700 border-2 border-sky-700 rounded text-white p-2"
                    >
                        Submit
                    </button>
                )}
            </div>
        </Modal>
    );
};

export { PostCreateModal };
