import { Outlet } from "react-router-dom";
import { LoggedInUserProvider } from "./contexts/useLoggedInUser";
import { Initialisation } from "./components/layouts/Initialisation";

const App = () => {
    return (
        <LoggedInUserProvider>
            <Initialisation>
                <Outlet />
            </Initialisation>
        </LoggedInUserProvider>
    );
};

export { App };
