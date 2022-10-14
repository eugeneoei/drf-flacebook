import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    const { type, id, defaultValue, disabled, ...rest } = props;
    return (
        <input
            ref={ref}
            type={type}
            id={id}
            defaultValue={defaultValue}
            disabled={disabled}
            {...rest}
            className="block w-full mt-2 p-2 rounded"
        />
    );
});

export { Input };
