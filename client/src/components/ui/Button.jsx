const Button = ({ type, text, click, classes }) => {
    return (
        <button
            type={type}
            onClick={click}
            className={`w-full bg-sky-700 rounded text-white p-4 ${classes}`}
        >
            {text}
        </button>
    );
};

export { Button };
