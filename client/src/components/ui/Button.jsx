const Button = ({ type, text, click }) => {
    return (
        <button
            type={type}
            onClick={click}
            className="w-full bg-sky-700 rounded text-white p-4"
        >
            {text}
        </button>
    );
};

export { Button };
