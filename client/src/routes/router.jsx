import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { PageNotFound } from "../pages/PageNotFound";
import { Home } from "../pages/Home";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]);

export { router };
