// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../ui/Modal";
import { usePost } from "../../contexts/usePost";

const PostEdit = () => {
    const {
        updatedContent,
        handleCloseEdit,
        handleContentChange,
        handleUpdate
    } = usePost();
    // const [content, setContent] = useState(postContent);

    // const handleContentChange = e => {
    //     setContent(e.target.value);
    // };

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     // update(content);
    //     handleUpdate();
    // };

    return (
        <Modal>
            <div className="relative">
                <span>Edit Post</span>
                <button
                    className="hover:bg-slate-100 p-2 rounded-full w-10 h-10 absolute right-0 -top-2"
                    onClick={handleCloseEdit}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="h-4 text-slate-500"
                    />
                </button>
            </div>
            <form onSubmit={handleUpdate}>
                <textarea
                    className="rounded-xl bg-slate-100 w-full p-4 focus:outline-none resize-y my-4"
                    rows={20}
                    value={updatedContent}
                    onChange={handleContentChange}
                />
                <button
                    type="submit"
                    onClick={handleUpdate}
                    className="w-full bg-sky-700 border-2 border-sky-700 rounded text-white p-2"
                >
                    Update
                </button>
            </form>
        </Modal>
    );
};

export { PostEdit };
