import { useRouteError } from "react-router-dom";

const PageNotFound = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="text-center mt-5">
            <h1>Oops!</h1>
            <h1>The page you are looking for does not exist.</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export { PageNotFound };
